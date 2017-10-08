import Moon from 'moonjs';
import domLoaded from 'dom-loaded';

window.app = null;

Moon.directive('selectedtab', (el, val) => {
	el.classList.remove('is-active', 'nvm');
	el.classList.add(app.get('helptopic') === val ? 'is-active' : 'nvm');
	el.onclick = () => {
		console.log('CLICK');
		app.set('helptopic', val);
		app.build();
	};
});

domLoaded.then(() => {
	console.log('Initializing');
	
	app = new Moon({
		el: '#app',
		data: {
			main: true,
			help: false,
			helptopic: 0
		},
		methods: {
			toggle() {
				new Promise(() => {
					document.getElementsByTagName('html')[0].style.backgroundColor = !this.get('main') ? 'black' : 'inherit';
				});
				this.set('main', !this.get('main'));
				this.set('help', !this.get('help'));
			}
		}
	});
});
