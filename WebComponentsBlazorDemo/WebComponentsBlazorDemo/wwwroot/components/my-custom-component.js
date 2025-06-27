// Create a class for the element
class MyCustomComponent extends HTMLElement {
	constructor() {
		// Always call super first in constructor
		super();
	}

	// This method is called when the element is added to the DOM
	connectedCallback() {
		console.log("MyCustomComponent connected");

		// Create a shadow root
		const shadow = this.attachShadow({ mode: "open" });

		// Create container elements
		const container = document.createElement("div");
		container.setAttribute("class", "container border-1 p-4");

		const paragraph = document.createElement("p");
		paragraph.textContent = "This is a custom web component with a button.";
		container.appendChild(paragraph);

		const btn = document.createElement("button");
		btn.setAttribute("type", "button");
		btn.setAttribute("class", "btn btn-primary");
		btn.textContent = this.buttonText;
		btn.addEventListener("click", this.handleButtonClick.bind(this));
		container.appendChild(btn);

		// Create some CSS to apply to the shadow dom
		const style = document.createElement("style");

		style.textContent = `
      .container {
        position: relative;
		border: 5px solid red;
		padding: 20px;
      }

      .btn {
        font-size: 0.8rem;
        width: 200px;
        display: inline-block;
        border: 1px solid black;
        padding: 10px;
        background: white;
        border-radius: 10px;
        z-index: 3;
      }

    `;

		// Attach the created elements to the shadow dom
		shadow.appendChild(style);
		shadow.appendChild(container);
	}

	// It is recommended that attributes be mirrored as properties
	set buttonText(value) {
		this.setAttribute('buttonText', value || 'Click me');
	}

	get buttonText() {
		return this.getAttribute('buttonText') || 'Click me';
	}

	// Attributes to observe. When changes occur, `attributeChangedCallback` is called.
	static get observedAttributes() {
		return ['buttontext'];
	}

	// This method is called when the element is updated
	attributeChangedCallback(name, oldValue, newValue) {
		console.log(`Attribute changed: ${name} from ${oldValue} to ${newValue}`);

		if (oldValue === newValue) return;

		this[name] = newValue;

		// process attribute changes
		if (name === 'buttontext') {
			if (!this.shadowRoot) return;
			const btn = this.shadowRoot.querySelector('button');
			if (btn) {
				btn.textContent = this.buttonText;
			}
		}
	}

	// Handle button click
	handleButtonClick() {
		// Create the event
		let event = new CustomEvent('someevent', {
			bubbles: true,
			cancelable: true,
			detail: 'This is data from WebComponent to Blazor. I could also be an object or array.' + Date.now()
		});

		// Emit the event
		this.dispatchEvent(event);
	}

	// This method is called when the element is removed from the DOM
	disconnectedCallback() {
		// Cleanup if necessary
		console.log("MyCustomComponent disconnected");
	}
}

// Define the new element
customElements.define("my-custom-component", MyCustomComponent);