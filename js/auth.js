const auth = () => {
	const cartButton = document.getElementById('cart-button');
	const buttonAuth = document.querySelector('.button-auth');
	const modalAuth = document.querySelector('.modal-auth');
	const closeAuth = document.querySelector('.close-auth');
	const logInForm = document.querySelector('#logInForm');
	const inputLogin = document.getElementById('login');
	const inputPassword = document.getElementById('password');
	const buttonOut = document.querySelector('.button-out');
	const userName = document.querySelector('.user-name');

	buttonAuth.addEventListener('click', () => { modalAuth.style.display = 'flex' });

	closeAuth.addEventListener('click', () => { modalAuth.style.display = 'none' });

	const login = (user) => {
		buttonAuth.style.display = 'none';
		buttonOut.style.display = 'flex';
		userName.style.display = 'flex';
		userName.textContent = user.login;
		cartButton.style.display = 'flex';
		modalAuth.style.display = 'none';
	}

	const logout = () => {
		buttonOut.style.display = 'none';
		cartButton.style.display = 'none';
		buttonAuth.style.display = 'flex';
		userName.textContent = '';
		userName.style.display = 'none';
		localStorage.removeItem('user');
	}

	logInForm.addEventListener('submit', (e) => {
		e.preventDefault();
		let user = {
			login: inputLogin.value,
			password: inputPassword.value
		};
		localStorage.setItem('user',JSON.stringify(user));
		login(user);	
	});

	if (localStorage.getItem('user')) 
		login(JSON.parse(localStorage.getItem('user')));

	buttonOut.addEventListener('click', () => { logout() });
};

auth();