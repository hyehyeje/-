// 오늘의 날짜를 표시
const yearMonthElement = document.getElementById('year-month');
const dayWeekdayElement = document.getElementById('day-weekday');

const today = new Date();

// 원하는 형식으로 연도와 월을 추출
const month = today.toLocaleDateString('en-US', { month: 'long' }); // "September" 형식
const year = today.getFullYear(); // "2024"

// "September 2024" 형식으로 표시
yearMonthElement.textContent = `${month} ${year}`;

// 요일과 일자는 그대로 한국어로 표시
const dayWeekday = today.toLocaleDateString('ko-KR', { day: 'numeric', weekday: 'long' });
dayWeekdayElement.textContent = `${dayWeekday}`;

// 투두리스트 추가 폼을 숨기거나 보여주는 기능
const toggleFormButton = document.getElementById('toggle-form');
const todoForm = document.getElementById('todo-form');
const emptyMessage = document.getElementById('empty-message');

toggleFormButton.addEventListener('click', function () {
    // "투두리스트를 입력해주세요!" 메시지를 숨기고 폼을 보여줌
    emptyMessage.classList.add('hidden');
    todoForm.classList.toggle('hidden'); // 폼의 표시/숨김 상태를 토글
});

// 투두리스트 항목 추가 기능
const addTaskButton = document.getElementById('add-task');
const newTaskInput = document.getElementById('new-task');
const deadlineInput = document.getElementById('deadline');
const priorityInput = document.getElementById('priority');
const todoList = document.getElementById('todo-list');

addTaskButton.addEventListener('click', function () {
    const taskText = newTaskInput.value;
    const deadline = deadlineInput.value;
    const priority = priorityInput.value;

    if (taskText && deadline) {
        // 새로운 투두리스트 항목 생성
        const newTask = document.createElement('div');
        newTask.classList.add('todo-item');

        // 중요도에 따라 네모 색상 설정
        const colorBox = document.createElement('div');
        colorBox.classList.add('todo-color');
        colorBox.style.backgroundColor = priority;

        // 할 일 내용과 마감 기한 설정
        const taskLabel = document.createElement('div');
        taskLabel.classList.add('todo-label');
        taskLabel.textContent = `${taskText} (마감: ${deadline})`;

        taskLabel.prepend(colorBox); // 중요도 네모를 할 일 왼쪽에 추가

        // 체크박스 추가
        const checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.classList.add('task-done');

        // 투두리스트 항목을 리스트에 추가
        newTask.appendChild(taskLabel);
        newTask.appendChild(checkBox);
        todoList.appendChild(newTask);

        // 입력 필드 초기화
        newTaskInput.value = '';
        deadlineInput.value = '';
        priorityInput.value = 'red';

        // 체크박스 체크 시 흐리게 처리
        checkBox.addEventListener('change', function () {
            if (this.checked) {
                newTask.style.opacity = 0.5;
            } else {
                newTask.style.opacity = 1;
            }
        });

        // 투두리스트 추가 후 폼을 다시 숨김
        todoForm.classList.add('hidden');
    } else {
        alert('할 일과 마감 기한을 입력하세요.');
    }
});
