document.addEventListener("DOMContentLoaded", () => {
    const user = document.getElementById("username_ip");
    const submit_btn = document.getElementById("submit_button");
    const stats = document.getElementsByClassName("stats_cont")[0];
    const easy_circle = document.getElementsByClassName("easy_solve")[0];
    const medium_circle = document.getElementsByClassName("medium_solve")[0];
    const hard_circle = document.getElementsByClassName("hard_solve")[0];
    const easy_label = document.getElementById("easy_label");
    const medium_label = document.getElementById("medium_label");
    const hard_label = document.getElementById("hard_label");
    const cards=document.getElementsByClassName("cards")[0];

    const validate = (username) => {
        const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]+$/;
        if (username === "") {
            alert("Please enter an Username!");
            return false;
        } else if (usernameRegex.test(username)) {
            return true;
        } else {
            alert("Enter a valid username!");
            return false;
        }
    };

    async function fetch_details(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try {
            submit_btn.textContent = "Searching!!";
            submit_btn.disabled = true;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Unable to fetch the user details!");
            }
            const data = await response.json();
            console.log(data);
            display_userdata(data);
            card_data(data);
            cards.classList.add("visible");
        } catch (e) {
            stats.innerHTML = "<p>Unable to Fetch data!</p>";
        } finally {
            submit_btn.textContent = "Search";
            submit_btn.disabled = false;
        }
    }

    function display_userdata(data) {
        const total_easy = data.totalEasy;
        const total_medium = data.totalMedium;
        const total_hard = data.totalHard;
        const solved_easy = data.easySolved;
        const solved_medium = data.mediumSolved;
        const solved_hard = data.hardSolved;

        update_progress(total_easy, solved_easy, easy_label, easy_circle);
        update_progress(total_medium, solved_medium, medium_label, medium_circle);
        update_progress(total_hard, solved_hard, hard_label, hard_circle);
    }

    function update_progress(total, solved, label, circle, difficulty) {
        const progressPercentage = (solved / total) * 100;
        circle.style.background = `conic-gradient(#4caf50 ${progressPercentage}%, #e0e0e0 ${progressPercentage}%)`;
        label.innerHTML = `${solved}/${total}`;
    }

    function card_data(data){
        const acceptance=data.acceptanceRate;
        const ranking=data.ranking;
        const contribution=data.contributionPoints;
        const contrib_div=document.getElementsByClassName("contrib")
        const accept_div=document.getElementsByClassName("acceptance")
        const ranking_div=document.getElementsByClassName("ranking")
        contrib_div[0].innerHTML="Contibution: "+contribution;
        accept_div[0].innerHTML="Acceptance rate: "+acceptance+"%";
        ranking_div[0].innerHTML="Ranking: "+ranking;
    }


    submit_btn.addEventListener("click", () => {
        const username = user.value;
        if (validate(username)) {
            fetch_details(username);
        }
    });
});
