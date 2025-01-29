{-# LANGUAGE OverloadedStrings #-}

module Main (main) where

import Network.Socket
import Network.Socket.ByteString (send)
import qualified Data.ByteString.Char8 as B
import Control.Exception (try, IOException)
import Control.Concurrent (forkIO, newMVar, modifyMVar_, MVar, readMVar, threadDelay)
import System.IO (hFlush, stdout)
import Control.Monad (forM_, when)
import System.Timeout (timeout)
import System.Process (callCommand)

main :: IO ()
main = do
    putStrLn "Security Tool Menu"
    putStrLn "1. Port Scanning"
    putStrLn "2. Add Firewall Rule"
    putStrLn "3. Show Firewall Rules"
    putStrLn "Choose an option: "
    hFlush stdout
    choice <- getLine
    case choice of
        "1" -> performPortScan
        "2" -> addFirewallRule
        "3" -> showFirewallRules
        _   -> putStrLn "Invalid option. Exiting."

performPortScan :: IO ()
performPortScan = do
    putStrLn "Enter the host to scan:"
    host <- getLine
    putStrLn "Enter the range of ports to scan (e.g., 1-100):"
    range <- getLine
    let ports = parsePortRange range
    putStrLn $ "Scanning ports " ++ show (head ports) ++ " to " ++ show (last ports) ++ " on host " ++ host ++ "..."
    hFlush stdout
    openPorts <- concurrentScan host ports
    putStrLn $ "Open ports: " ++ show openPorts
    testFirewall host openPorts
    simulateIDSTesting host openPorts

addFirewallRule :: IO ()
addFirewallRule = do
    putStrLn "Enter the port number to block:"
    port <- getLine
    putStrLn "Enter rule action (allow/deny):"
    action <- getLine
    let rule = "iptables -A INPUT -p tcp --dport " ++ port ++ " -j " ++ (if action == "allow" then "ACCEPT" else "DROP")
    putStrLn $ "Adding firewall rule: " ++ rule
    callCommand rule
    appendFile "firewall_rules.txt" (rule ++ "\n")
    putStrLn "Firewall rule added."

showFirewallRules :: IO ()
showFirewallRules = do
    putStrLn "Current Firewall Rules:"
    rules <- readFile "firewall_rules.txt"
    putStrLn rules

scanPort :: HostName -> PortNumber -> MVar [PortNumber] -> IO ()
scanPort host port openPorts = do
    addr <- resolve host port
    sock <- openSocket' addr
    result <- tryConnect sock addr
    case result of
        Just _ -> do
            putStrLn $ "Port " ++ show port ++ " is open"
            modifyMVar_ openPorts $ \ports -> return (port : ports)
        Nothing -> return ()
    close sock

resolve :: HostName -> PortNumber -> IO AddrInfo
resolve host port = do
    let hints = defaultHints { addrSocketType = Stream }
    addr:_ <- getAddrInfo (Just hints) (Just host) (Just $ show port)
    return addr

openSocket' :: AddrInfo -> IO Socket
openSocket' addr = socket (addrFamily addr) (addrSocketType addr) (addrProtocol addr)

tryConnect :: Socket -> AddrInfo -> IO (Maybe ())
tryConnect sock addr = do
    result <- try (connect sock (addrAddress addr)) :: IO (Either IOException ())
    return $ either (const Nothing) Just result

concurrentScan :: HostName -> [PortNumber] -> IO [PortNumber]
concurrentScan host ports = do
    openPorts <- newMVar []
    let scanAction port = forkIO $ scanPort host port openPorts
    mapM_ scanAction ports
    threadDelay 2000000
    readMVar openPorts

testFirewall :: HostName -> [PortNumber] -> IO ()
testFirewall host openPorts = do
    putStrLn "\nTesting firewall rules..."
    forM_ openPorts $ \port -> do
        putStrLn $ "Checking if port " ++ show port ++ " should be accessible..."
        let allowedPorts = [22, 80, 443]
        when (port `notElem` allowedPorts) $
            putStrLn $ "Warning: Port " ++ show port ++ " is open but not in the allowed list!"

simulateIDSTesting :: HostName -> [PortNumber] -> IO ()
simulateIDSTesting host openPorts = do
    putStrLn "\nSimulating IDS/IPS testing..."
    forM_ openPorts $ \port -> do
        addr <- resolve host port
        sock <- openSocket' addr
        result <- timeout 2000000 $ tryConnect sock addr
        case result of
            Just (Just _) -> do
                putStrLn $ "Sending test data to port " ++ show port ++ " to evaluate IDS/IPS response..."
                res <- try (send sock (B.pack "Test traffic for IDS detection")) :: IO (Either IOException Int)
                case res of
                    Right bytesSent -> putStrLn $ "Sent " ++ show bytesSent ++ " bytes of test data."
                    Left err -> putStrLn $ "Error sending test data: " ++ show err
            _ -> putStrLn $ "Port " ++ show port ++ " did not respond in time."
        close sock

parsePortRange :: String -> [PortNumber]
parsePortRange range =
    let [start, end] = map read $ wordsWhen (=='-') range
    in [start..end]

wordsWhen :: (Char -> Bool) -> String -> [String]
wordsWhen p s = case dropWhile p s of
    "" -> []
    s' -> w : wordsWhen p s''
        where (w, s'') = break p s'
