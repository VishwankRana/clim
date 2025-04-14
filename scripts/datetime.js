function displayDateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const time = `${hours}:${minutes} ${ampm}`;
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(now);
    const timeElement = document.querySelector(".timeContainer");
    if (timeElement) timeElement.innerHTML = time;
    const dateDayElement = document.querySelector(".dateContainer");
    if (dateDayElement) dateDayElement.textContent = formattedDate;
}

displayDateTime();
