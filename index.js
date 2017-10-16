import Moon from 'moonjs';
import domLoaded from 'dom-loaded';
import execute from './exec.js';

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
			helptopic: 0,
			running: false,
			execpromise: null,
			rawMessages: ["Welcome to ISUv2!"],
			messages: "Welcome to ISUv2!"
		},
		methods: {
			toggle() {
				new Promise(() => {
					document.getElementsByTagName('html')[0].style.backgroundColor = !this.get('main') ? 'black' : 'inherit';
				});
				this.set('main', !this.get('main'));
				this.set('help', !this.get('help'));
			},
			runcode() {
				this.set('running', true);
				this.set('execpromise',execute(document.getElementById('code').value)
					.then(() => {
						this.set('running', false);
					}));
			},
			terminate() {
				this.get('execpromise').cancel();
				this.set('running', false);
			},
			addMessage(mesg) {
				this.set('rawMessages', this.get('rawMessages').concat(mesg));
				this.set('messages', this.get('rawMessages').join('<br />'));
				this.build();
			},
			clearMessages() {
				this.set('rawMessages', []);
				this.set('messages', '');
				this.build();
			}
		}
	});
});
