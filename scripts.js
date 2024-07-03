const calendar = document.getElementById('calendar');
const calendarTitle = document.getElementById('calendar-title');
const dayViewButton = document.getElementById('day-view');
const weekViewButton = document.getElementById('week-view');
const monthViewButton = document.getElementById('month-view');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentDate = new Date();
let currentView = 'month';

const emojis = ['😊', '🌟', '🎉', '📅', '❤️', '☀️', '🌙', '🍀', '🔥', '🎈', '🎂', '🏆', '🌈', '🍎', '🎨', '🎵', '⚽'];

function getEmojiSVG(emoji) {
    return `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text y="50%" x="50%" font-size="50" text-anchor="middle" dominant-baseline="middle">${emoji}</text></svg>')`;
}

function renderCalendar() {
    calendar.innerHTML = '';
    calendar.className = `${currentView}-view`;

    if (currentView === 'day') {
        renderDayView();
    } else if (currentView === 'week') {
        renderWeekView();
    } else if (currentView === 'month') {
        renderMonthView();
    }
}

function renderDayView() {
    calendarTitle.textContent = currentDate.toDateString();
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day';
    dayDiv.innerHTML = `<div class="day-number">${currentDate.getDate()}</div>`;
    dayDiv.style.backgroundImage = getEmojiSVG(emojis[Math.floor(Math.random() * emojis.length)]);
    calendar.appendChild(dayDiv);
}

function renderWeekView() {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    calendarTitle.textContent = `Week of ${startOfWeek.toDateString()}`;

    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.innerHTML = `<div class="day-number">${day.getDate()}</div>`;
        dayDiv.style.backgroundImage = getEmojiSVG(emojis[i % emojis.length]);
        calendar.appendChild(dayDiv);
    }
}

function renderMonthView() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    calendarTitle.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    const firstDayWeekday = firstDayOfMonth.getDay();
    for (let i = 0; i < firstDayWeekday; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'day';
        calendar.appendChild(emptyDiv);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.innerHTML = `<div class="day-number">${i}</div>`;
        dayDiv.style.backgroundImage = getEmojiSVG(emojis[(i - 1) % emojis.length]);
        calendar.appendChild(dayDiv);
    }
}

dayViewButton.addEventListener('click', () => {
    currentView = 'day';
    renderCalendar();
});

weekViewButton.addEventListener('click', () => {
    currentView = 'week';
    renderCalendar();
});

monthViewButton.addEventListener('click', () => {
    currentView = 'month';
    renderCalendar();
});

prevButton.addEventListener('click', () => {
    if (currentView === 'day') {
        currentDate.setDate(currentDate.getDate() - 1);
    } else if (currentView === 'week') {
        currentDate.setDate(currentDate.getDate() - 7);
    } else if (currentView === 'month') {
        currentDate.setMonth(currentDate.getMonth() - 1);
    }
    renderCalendar();
});

nextButton.addEventListener('click', () => {
    if (currentView === 'day') {
        currentDate.setDate(currentDate.getDate() + 1);
    } else if (currentView === 'week') {
        currentDate.setDate(currentDate.getDate() + 7);
    } else if (currentView === 'month') {
        currentDate.setMonth(currentDate.getMonth() + 1);
    }
    renderCalendar();
});

renderCalendar();
