document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("simja");
    const nameInput = document.getElementById("name");
    const numberInput = document.getElementById("number");
    const checkListButton = document.querySelector(".myeongdan button");
    const nameList = document.querySelector("ul");
    
    const localStorageKey = "studentList_men_3rd"; // 페이지별로 다른 키 사용

    // Get the student list from localStorage or initialize it if not present
    let studentList = JSON.parse(localStorage.getItem(localStorageKey)) || [];

    function addStudent(name, number) {
        if (studentList.length >= 5) {
            alert("명단이 가득 찼습니다.");
            return;
        }
        studentList.push({ name, number });
        localStorage.setItem(localStorageKey, JSON.stringify(studentList));
    }

    function displayStudentList() {
        nameList.innerHTML = ""; // Clear existing list
        studentList.forEach(function(student) {
            const listItem = document.createElement("li");
            listItem.textContent = `${student.name} (${student.number})`;
            nameList.appendChild(listItem);
        });
    }

    checkListButton.addEventListener("click", function() {
        displayStudentList();
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission
        const name = nameInput.value.trim();
        const number = numberInput.value.trim();

        if (name && number) {
            addStudent(name, number);
            nameInput.value = "";
            numberInput.value = "";
            displayStudentList(); // Update the list immediately
        } else {
            alert("이름과 학번을 모두 입력해주세요.");
        }
    });

    function resetListAtNoon() {
        const now = new Date();
        const noon = new Date();
        noon.setHours(12, 0, 0, 0);

        let timeUntilNoon = noon - now;

        if (timeUntilNoon < 0) {
            timeUntilNoon += 24 * 60 * 60 * 1000; // Calculate time until next day at noon
        }

        setTimeout(function() {
            studentList = [];
            localStorage.removeItem(localStorageKey);
            nameList.innerHTML = "";
            alert("명단이 초기화되었습니다.");
            resetListAtNoon(); // Schedule reset for the next day at noon
        }, timeUntilNoon);
    }

    // Display the student list when the page loads
    displayStudentList();

    // Start the daily reset process
    resetListAtNoon();
});
