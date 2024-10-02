// Setting getblock node as HTTP provider
    const provider = new Web3.providers.HttpProvider("https://go.getblock.io/a3b1b7fe65d94349a7faaa1750972fcc");
// Creating web3 instance with given provider
    const web3 = new Web3(provider);
// Initializing web3.eth method
    var block = web3.eth.getBlockNumber().then(console.log);

    let web3m = new Web3(window.ethereum);

    window.onload = async function() {
        isConnected();
        Chain();
     };

      //Check if MM is already connected       
     async function isConnected() { 
        const accounts = await ethereum.request({method: 'eth_accounts'});       
        if (accounts.length) {
         ConnectWallet(); } 
         else {
           console.log("Metamask is not connected");}
     };

    //Check which chain it is connected to, if connected
     async function Chain() {
        await web3m.eth.getChainId().then(chain => {
        console.log(chain);
        document.getElementById('chainID').innerText = `${chain}`;
    })};

    //Connect MM to Site
    async function ConnectWallet() {
                     
        let account;
        ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
            account = accounts[0];
            console.log(account);
            document.getElementById('connectbutton').innerHTML = account;
            ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] }).then(result => {
                console.log(result);
                let wei = parseInt(result, 16);
                let balance = wei / (10 ** 18);
                balance = balance.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:10});
                console.log(balance + "ETH");
                const ETCBalance = document.getElementById('ethBalance');
                ETCBalance.innerText = `${balance}`;});})};

    //Connect on button click
    document.getElementById("connectbutton").onclick = ConnectWallet;