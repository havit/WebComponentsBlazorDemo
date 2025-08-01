export function initialize(element, dotnetReference) {
	element.dotnetReference = dotnetReference;
	element.addEventListener('someevent', function (e) {
		dotnetReference.invokeMethodAsync('HandleSomeEvent', e.detail);
	});
	element.test();
}

export function dispose(element) {
	// TODO
}