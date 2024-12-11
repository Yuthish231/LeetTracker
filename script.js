document.addEventListener("DOMContentLoaded",()=>{
   const user=label=document.getElementById("username_ip")
   const submit_btn=document.getElementById("submit_button")
   const stats=document.getElementsByClassName("stats_cont")[0]
   const easy_circle=document.getElementsByClassName("easy_solve")[0]
   const medium_circle=document.getElementsByClassName("medium_solve")[0]
   const hard_circle=document.getElementsByClassName("hard_solve")[0]
   const easy_label=document.getElementById("easy_label")
   const medium_label=document.getElementById("medium_label")
   const hard_label=document.getElementById("hard_label")
   const stats_card=document.querySelector("cards")

   const validate=(username)=>{
    const usernameRegex = /^[a-zA-Z0-9_]{5,20}$/;
    if (username===""){
        alert("Please enter an Username!")
        return false
    }
    else if (usernameRegex.test(username)){
        return true

    }
    else{
        alert("Enter a valid username!")
        return false
    }
}  

    async function fetch_details(username) {

        const url=`https://leetcode-stats-api.herokuapp.com/${username}`
        try{
            submit_btn.textContent="Searching!!"
            submit_btn.disabled=true
            const response = await fetch(url);
            if (!response.ok){
                throw new Error("Unable to fetch the user details!");
            }
            const data= await response.json()
            console.log(data)
        }
        catch(e){
            stats.innerHTML="<p>Unable to Fetch data!</p>"
        }
        finally{
            submit_btn.textContent="Search"
            submit_btn.disabled=false
        }
    }
   
   submit_btn.addEventListener("click",()=>{
    const username=user.value
    if(validate(username)){
        fetch_details(username)
    }
})
})