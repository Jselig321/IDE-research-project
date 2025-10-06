function startSession() {
        const sessionStartTime = new Date();
        localStorage.setItem('sessionStartTime', sessionStartTime.toISOString());
        console.log("Session start time stored:", sessionStartTime.toISOString());
        window.location.href = 'keyLoggerPage.html';
    
}
 function endSession() {
    const sessionStartTime = new Date(localStorage.getItem('sessionStartTime'));
    const sessionEndTime = new Date();
    const sessionDurationMs = sessionEndTime - sessionStartTime;
    localStorage.setItem('sessionEndTime', sessionEndTime.toISOString());
    localStorage.setItem('sessionDuration', sessionDurationMs);
    window.location.href = 'finalPage.html';
 }
 
 
 function displaySessionSummary() {
    const sessionStartTime = new Date(localStorage.getItem('sessionStartTime'));
    const sessionEndTime = new Date(localStorage.getItem('sessionEndTime'));
    const sessionDuration = localStorage.getItem('sessionDuration');
 
    document.getElementById('startTime').textContent = sessionStartTime.toLocaleString();
    document.getElementById('endTime').textContent = sessionEndTime.toLocaleString();
 
 
    const hours = Math.floor(sessionDuration / (1000*60*60));
    const minutes = Math.floor((sessionDuration % (1000*60*60)) / (1000*60));
    const seconds = Math.floor(sessionDuration % (1000*60))/1000;
 
 
    const formattedDuration = `${hours} hours ${minutes} minutes ${seconds} seconds`;
    document.getElementById('duration').textContent = formattedDuration;
 }
 