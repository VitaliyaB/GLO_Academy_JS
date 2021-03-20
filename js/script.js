// * функция получает тип данных и Rest-оператором преобразует пользовательскую строку в массив, осуществляет фильтрацию данных согласно типу данных и возвращает новый массив
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

	// * функция прячет все результирующие блоки
	hideAllResponseBlocks = () => {
		// * создаем массив из полученных элементов со страницы с классом dialog__response-block
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		// * перебираем массив результирующих блоков и каждому блоку устанавливаем display=none, т.е. делаем невидимым
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

	// * функция переключает результирующие блоки для отображения. Получает селектор результирующего блока, результат фильтрации и селектор элемента куда выводить результат
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		// * вызываем функцию hideAllResponseBlocks
		hideAllResponseBlocks();
		// * находим блок по переданному селектору blockSelector и устанавливаем ему свойство display=block, т.е. делаем видимым
		document.querySelector(blockSelector).style.display = 'block';
		// * проверяем передавался ли селектор для элемента куда должен выводиться результат
		if (spanSelector) {
			// * если передавался, то находим этот элемент, по переданному селектору, и заменяем текст в этом элементе на переданный в msgText
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

	// * вызываем функцию showResponseBlock и передаем селектор элемента, в котором выводится результат, текст сообщения и в какой элемент добавлять текст
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	// * вызываем функцию showResponseBlock и передаем селектор элемента, в котором выводится результат, текст сообщения и в какой элемент добавлять текст
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

	// * вызываем функцию showResponseBlock и передаем селектор элемента, в котором выводится результат
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	// * функция получает данные от пользователя и составляет сообщение о результате фильтрации
	tryFilterByType = (type, values) => {
		// * блок с кодом, который выполняется
		try {
			// * записываем результат выполнения функции filterByType предварительно преобразовав результат в строку
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			// * записываем сообщение для вывода. Если после фильтрации данные остались, то сохраняем какой тип и какие данные отфильтровались, иначе указываем, что пользователь не ввел указанные им данные
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			// * вызываем функцию showResults, в которую передаем наше сообщение
			showResults(alertMsg);
		} catch (e) { // * блок с кодом, который выполниться, если в try произойдет ошибка
			// * если в блоке try произошла ошибка, то вызываем функцию showError, в которую передаем объект ошибки
			showError(`Ошибка: ${e}`);
		}
	};

// * получаем элемент со страницы с id=filter-btn
const filterButton = document.querySelector('#filter-btn');

// * навешиваем событие click на filterButton
filterButton.addEventListener('click', e => {
	// * получаем элемент со страницы с id=type
	const typeInput = document.querySelector('#type');
	// * получаем элемент со страницы с id=data
	const dataInput = document.querySelector('#data');

	// * проверяем заполнен ли инпут пользователем
	if (dataInput.value === '') {
		// * если инпут пустой, то выводим специальное сообщение
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		// * вызываем функцию showNoResults
		showNoResults();
	} else {
		// * если инпут не пустой, то специальное сообщение не выводится
		dataInput.setCustomValidity('');
		// * отменяем стандартное поведение в браузере по клику на кнопку
		e.preventDefault();
		// * вызываем функцию tryFilterByType, в которую передаем выбранный пользователем тип данных и введенные пользователем данные, предварительно убрав пробелы в начале и конце строки
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});
