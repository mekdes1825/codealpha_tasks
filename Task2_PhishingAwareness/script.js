const challenges = [
{category:"EMAIL PHISHING",question:"An email claims your bank account will be suspended today.",scenario:"The message says you must click a link and “verify your account immediately.” You were not expecting this email.",answers:["Click the link quickly so the account is not suspended.","Reply with your account details to confirm your identity.","Avoid the link and check your account through the bank’s official app or website.","Forward the email to friends and ask whether it looks real."],correct:2,explanation:"Urgency and unexpected account warnings are common phishing tactics. Use a trusted route you already know, rather than the message’s link."},
{category:"FAKE WEBSITES",question:"A sign-in page looks familiar, but its web address is unusual.",scenario:"You receive a link to a page that resembles your university portal. The domain has extra words and a spelling change.",answers:["Enter your password because the page looks familiar.","Check the address carefully and navigate to the official portal using a trusted bookmark or typed address.","Use the page if it has a padlock icon.","Enter a random password to see whether the page accepts it."],correct:1,explanation:"A convincing design or HTTPS padlock does not prove a site is legitimate. Verify the full domain and use a trusted route."},
{category:"SOCIAL ENGINEERING",question:"Someone claiming to be IT asks for your one-time verification code.",scenario:"They say they need the code to fix your account and warn that your access may be blocked if you delay.",answers:["Share the code because the person says they work in IT.","Share only the first few digits.","Send a screenshot of the verification message.","Do not share the code; contact IT through an official channel to verify the request."],correct:3,explanation:"One-time codes can let someone access your account. Legitimate support should not ask you to disclose your authentication code."},
{category:"DELIVERY SCAMS",question:"You receive a text asking for a small fee to release a package.",scenario:"The message includes a shortened link and says delivery will be canceled unless you pay within an hour.",answers:["Open the link and pay the fee immediately.","Reply with your full name and address.","Check delivery status through the courier’s official app or website, not the text link.","Install any app the message recommends."],correct:2,explanation:"Unexpected delivery-fee messages often use urgency and fake payment pages. Check directly with the courier using a trusted channel."},
{category:"BUSINESS EMAIL COMPROMISE",question:"Your manager emails asking for an urgent transfer to a new bank account.",scenario:"The email says the request is confidential and that you must complete it before the end of the day.",answers:["Make the transfer because the message appears to come from your manager.","Verify the request using a separate, known contact method and follow your organization’s payment-approval process.","Reply to the email asking whether it is real, then transfer if they say yes.","Send the money to a small test account first."],correct:1,explanation:"Attackers may impersonate executives or compromise email accounts. Confirm unusual payment changes independently and follow approval procedures."},
{category:"SUSPICIOUS LINKS",question:"You clicked a suspicious link and entered your password. What should you do?",scenario:"The page now looks strange, and you suspect it was fake.",answers:["Wait to see whether anything happens.","Send the same password to the sender to confirm it.","Close the page and do nothing else.","Use the legitimate service to change the password immediately, change it anywhere else it was reused, and report the incident."],correct:3,explanation:"Act quickly from a trusted device and legitimate website. Change exposed credentials, secure related accounts, and report the incident."},
{category:"QR CODE PHISHING",question:"A QR code on a public notice asks you to sign in to claim a reward.",scenario:"The code leads to a login page you do not recognize. The notice urges you to scan it right away.",answers:["Scan it and sign in because QR codes are safe.","Enter your details, but use a slightly different password.","Avoid entering credentials; verify the offer and destination through the organization’s official channel.","Share the QR code with others to check whether it works."],correct:2,explanation:"QR codes can hide malicious destinations. Check the destination carefully and verify the offer through a trusted official source."},
{category:"MALICIOUS ATTACHMENTS",question:"An unexpected email attachment says “Invoice” and asks you to enable macros.",scenario:"You do not recognize the sender or expect an invoice, but the message says the document will not display unless macros are enabled.",answers:["Enable macros so you can read the document.","Do not open or enable macros; verify with the sender through a trusted channel and report the message if suspicious.","Disable antivirus temporarily if the file will not open.","Upload the attachment to a public file-sharing site."],correct:1,explanation:"Unexpected attachments and requests to enable macros can be signs of malware. Do not bypass security controls; verify and report."},
{category:"PASSWORD RESET SCAMS",question:"You receive a password-reset email you did not request.",scenario:"The email includes a button to cancel the reset and says your account may be compromised.",answers:["Click the email button and enter your current password.","Reply with your username and password.","Ignore all account security alerts permanently.","Do not use the email link; visit the service through its official app or website, review account security, and report anything suspicious."],correct:3,explanation:"Unexpected reset messages may be used to lure you to a fake page. Visit the service directly and check for unfamiliar activity."},
{category:"REPORTING PHISHING",question:"You notice a suspicious message in your work inbox. What should you do?",scenario:"You have not clicked anything. Your organization has a designated phishing-report button or security contact.",answers:["Report it using the approved process, and avoid clicking links or opening attachments.","Forward it to everyone so they can inspect it.","Delete it without reporting, even if your organization asks for reports.","Reply to the sender to ask why they sent it."],correct:0,explanation:"Reporting through the approved channel helps security teams investigate and warn others. Do not spread the message by forwarding it broadly."}
];

const $ = id => document.getElementById(id);
const startScreen=$("start-screen"), quizScreen=$("quiz-screen"), resultScreen=$("result-screen");
let currentIndex=0, score=0, answered=false;

function showScreen(target){[startScreen,quizScreen,resultScreen].forEach(s=>s.classList.toggle("active",s===target));}
function startQuiz(){currentIndex=0;score=0;$("score").textContent=score;showScreen(quizScreen);renderQuestion();}
function renderQuestion(){
  answered=false;
  const item=challenges[currentIndex];
  $("progress").textContent=`Question ${currentIndex+1} of ${challenges.length}`;
  $("progress-bar").style.width=`${currentIndex/challenges.length*100}%`;
  document.querySelector(".track").setAttribute("aria-valuenow",currentIndex);
  $("category").textContent=item.category;$("question").textContent=item.question;$("scenario").textContent=item.scenario;
  $("answers").innerHTML="";$("feedback").className="feedback hidden";$("feedback-title").textContent="";$("feedback-text").textContent="";
  $("next-btn").classList.add("hidden");$("next-btn").textContent=currentIndex===challenges.length-1?"See my result →":"Next question →";
  item.answers.forEach((answer,index)=>{
    const btn=document.createElement("button");btn.type="button";btn.className="answer";
    const letter=document.createElement("span");letter.className="letter";letter.textContent=String.fromCharCode(65+index);
    const text=document.createElement("span");text.textContent=answer;btn.append(letter,text);
    btn.addEventListener("click",()=>chooseAnswer(index));$("answers").appendChild(btn);
  });
}
function chooseAnswer(selected){
  if(answered)return;answered=true;
  const item=challenges[currentIndex],buttons=[...$("answers").querySelectorAll(".answer")];
  buttons.forEach((btn,i)=>{btn.disabled=true;if(i===item.correct)btn.classList.add("correct");if(i===selected&&selected!==item.correct)btn.classList.add("incorrect");});
  const correct=selected===item.correct;if(correct)score++;$("score").textContent=score;
  $("feedback").className=`feedback ${correct?"correct":"incorrect"}`;
  $("feedback-title").textContent=correct?"✓ Correct answer!":"✕ Not quite";$("feedback-text").textContent=item.explanation;
  $("next-btn").classList.remove("hidden");
}
function nextChallenge(){if(currentIndex<challenges.length-1){currentIndex++;renderQuestion();}else showResult();}
function showResult(){
  $("progress-bar").style.width="100%";document.querySelector(".track").setAttribute("aria-valuenow",challenges.length);
  $("final-score").textContent=`${score}/${challenges.length}`;
  const pct=score/challenges.length*100;
  if(pct>=90){$("security-level").textContent="Phishing Spotter";$("result-message").textContent="You recognized most warning signs and chose safe responses across these scenarios.";}
  else if(pct>=70){$("security-level").textContent="Security Aware";$("result-message").textContent="You showed a solid understanding of common phishing tactics. Review the explanations to strengthen a few areas.";}
  else if(pct>=50){$("security-level").textContent="Building Awareness";$("result-message").textContent="You identified some warning signs. Revisit the explanations and try again to practice safer responses.";}
  else{$("security-level").textContent="Keep Practicing";$("result-message").textContent="Phishing can be difficult to spot. Review the safety tips and explanations, then try the challenge again.";}
  showScreen(resultScreen);
}
$("start-btn").addEventListener("click",startQuiz);$("next-btn").addEventListener("click",nextChallenge);$("restart-btn").addEventListener("click",startQuiz);
