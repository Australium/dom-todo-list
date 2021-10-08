'use strict';

const inputEl = document.querySelector('#inp');
const buttonEl = document.querySelector('#btn');
const paragraphEl = document.querySelector('#para');
const listEl = document.querySelector('#list');
const inputWrapEl = document.querySelector('#inp-wrap')
const paragraphError = document.createElement('p');
// const textAttention = document.querySelector('#attention');

buttonEl.addEventListener('click',onButtonClick);
listEl.addEventListener('click', onTaskClickToggle);
listEl.addEventListener('click', onClickDeleteTask);

// function onButtonClick () {
//     let writtenTask = inputEl.value;
//     let itemEl = document.createElement('li');
//     itemEl.classList.add('todo-item');
//     let itemButtonEl = document.createElement('button');
//     itemButtonEl.textContent = 'X';
//     itemButtonEl.classList.add('todo-item-button');
//     let itemParagraphEl = document.createElement('p');
//     itemParagraphEl.textContent = writtenTask;

//     if (inputEl.value === '') {
//         textAttention.textContent = 'Поле должно быть заполнено!';
//     } else {
//         listEl.append(itemEl);
//         itemEl.append(itemButtonEl);
//         itemEl.append(itemParagraphEl);
//         inputEl.value = '';
//         textAttention.textContent = '';
//     }
// }

function onButtonClick () {
    let writtenTask = inputEl.value;

    let itemEl = document.createElement('li');
    addClassList(itemEl,'todo-item');
    let itemButtonEl = document.createElement('button');
    addClassList(itemButtonEl,'todo-item-button');
    addTextContent(itemButtonEl,'X');
    let itemParagraphEl = document.createElement('p');
    addTextContent(itemParagraphEl,writtenTask);

    if (giveError(writtenTask)) return;

    clearErrorParagraph();
    appendElements(itemEl,listEl);
    appendElements(itemButtonEl,itemEl);
    appendElements(itemParagraphEl,itemEl);
    inputEl.value = '';
}

function onTaskClickToggle (e) {
    let item = e.target.closest('.todo-item');
    if (item === e.target) item.classList.toggle('todo-item-done');
}

function onClickDeleteTask(e) {
    let itemForDelete = e.target.closest('.todo-item');
    let deleteButton = e.target.closest('.todo-item-button');
    if (deleteButton === e.target) itemForDelete.remove();
}

function addTextContent (element,textContent) {
    element.textContent = textContent;
}

function addClassList (element,className) {
    element.classList.add(`${className}`);
}

function giveError(error) {
    let errors = {
        emptyField: 'Поле должно быть заполнено!',
        onlyNumbers: 'Нужно ввести текст!',
    }
    if (error === '' || +error == 0) {
        return createErrorField(errors.emptyField)
    }
    else if (+error === Number(error)) {
        return createErrorField(errors.onlyNumbers);
    }
}

function createErrorField(message) {
    addClassList(paragraphError,'warning');
    paragraphError.textContent = message
    inputWrapEl.append(paragraphError);
    return true;
}

function clearErrorParagraph() {
    if (paragraphError.textContent) {
        paragraphError.textContent = '';
    }
}

function appendElements(elementToAppend, whereToAppend) {
    whereToAppend.append(elementToAppend);
}