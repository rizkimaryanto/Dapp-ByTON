const contractAddress = '0x6F167EB8A90B84346A17f707c7850F318Cc44aC6';
const abi = []; // Masukkan ABI dari file abi.json

async function init() {
    // Inisialisasi Web3 dan koneksi ke kontrak
    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(abi, contractAddress);

        // Ambil saldo pengguna
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const balance = await contract.methods.balanceOf(accounts[0]).call();
        document.getElementById('balance').innerText = web3.utils.fromWei(balance, 'ether');

        // Tambahkan event listener untuk tombol klaim airdrop
        document.getElementById('claimAirdrop').addEventListener('click', async () => {
            await contract.methods.claimAirdrop().send({ from: accounts[0] });
            alert('Airdrop claimed successfully!');
        });

        // Tambahkan event listener untuk registrasi pengguna
        document.getElementById('registerUser').addEventListener('click', async () => {
            const userName = document.getElementById('userName').value;
            const userUID = document.getElementById('userUID').value;
            await contract.methods.registerUser(userName, userUID).send({ from: accounts[0] });
            alert('User registered successfully!');
        });

        // Ambil dan tampilkan pengguna teratas
        const users = await contract.methods.getTopUsers().call();
        const userList = document.getElementById('userList');
        users.forEach(user => {
            const li = document.createElement('li');
            li.innerText = user;
            userList.appendChild(li);
        });
    } else {
        alert('Please install MetaMask!');
    }
}

// Jalankan fungsi init pada load
window.onload = init;
