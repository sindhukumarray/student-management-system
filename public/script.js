const form = document.getElementById("studentForm");
const list = document.getElementById("studentList");

let editId = null;

loadStudents();

// Date

const dateElement = document.getElementById("date");

if(dateElement){
    dateElement.innerText =
    "Date : " + new Date().toLocaleDateString();
}

// Submit Form

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const student = {

        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        course: document.getElementById("course").value

    };

    // Validation

    if(student.name.length < 3){

        alert("Name must be at least 3 characters");
        return;

    }

    if(!student.email.includes("@")){

        alert("Please enter valid email");
        return;

    }

    if(student.course === ""){

        alert("Please select course");
        return;

    }

    // UPDATE

    if(editId){

        await fetch(`/update/${editId}`,{

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(student)

        });

        alert("Student Updated Successfully");

        editId = null;

        document.querySelector("button[type='submit']")
        .innerText = "Add Student";

    }

    // ADD

    else{

        await fetch("/add",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(student)

        });

        alert("Student Added Successfully");

    }

    form.reset();

    loadStudents();

});

// Load Students

async function loadStudents(){

    const res = await fetch("/students");

    const data = await res.json();

    document.getElementById("totalStudents").innerText =
    data.length;

     if(data.length === 0){

        list.innerHTML = `
            <div class="empty">
                No Students Found
            </div>
        `;

        return;
    }

    list.innerHTML = "";

    data.forEach(student => {

        list.innerHTML += `

        <div class="student">

 <div>
    <span class="id-badge">#${student.id}</span>

    <h3>${student.name}</h3>

    <p>${student.email}</p>

    <p>${student.course}</p>
</div>

            <div class="btn-group">

                <button
                class="edit-btn"
                onclick="editStudent(
                ${student.id},
                '${student.name}',
                '${student.email}',
                '${student.course}'
                )">

                Edit

                </button>

                <button
                class="delete-btn"
                onclick="deleteStudent(${student.id})">

                Delete

                </button>

            </div>

        </div>

        `;

    });

}

// Edit Student

function editStudent(id,name,email,course){

    document.getElementById("name").value = name;

    document.getElementById("email").value = email;

    document.getElementById("course").value = course;

    editId = id;

    document.querySelector("button[type='submit']")
    .innerText = "Update Student";

}

// Delete Student

async function deleteStudent(id){

    const confirmDelete =
    confirm("Are you sure you want to delete this student?");

    if(!confirmDelete) return;

    await fetch(`/delete/${id}`,{

        method:"DELETE"

    });

    alert("Student Deleted Successfully");

    loadStudents();

}

// Search

const searchInput =
document.getElementById("search");

if(searchInput){

    searchInput.addEventListener("keyup", function(){

        const value =
        this.value.toLowerCase();

        const students =
        document.querySelectorAll(".student");

        students.forEach(student => {

            student.style.display =

            student.innerText
            .toLowerCase()
            .includes(value)

            ? "flex"

            : "none";

        });

    });

}
//dark mode 
const themeBtn =
document.getElementById("themeBtn");

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark-mode");

    if(
        document.body.classList.contains("dark-mode")
    ){

        themeBtn.innerText =
        "☀️";

    }

    else{

        themeBtn.innerText =
        "🌙";

    }

});

// Export CSV

document
.getElementById("exportBtn")
.addEventListener("click", exportCSV);

async function exportCSV(){

    const res =
    await fetch("/students");

    const data =
    await res.json();

    if(data.length === 0){

        alert("No Students Found");

        return;

    }

    let csv =

    "ID,Name,Email,Course\n";

    data.forEach(student => {

        csv +=

        `${student.id},${student.name},${student.email},${student.course}\n`;

    });

    const blob =
    new Blob([csv],{

        type:"text/csv"

    });

    const url =
    window.URL.createObjectURL(blob);

    const a =
    document.createElement("a");

    a.href = url;

    a.download = "students.csv";

    a.click();

}