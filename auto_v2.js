var ans = []
function getText(obj){
    text = ""
    for(p=0;p<obj.length;p++)
        text += obj[p].innerText
    return text
}
$.ajax({
    type: "GET",
    cache: false,
    url: "/home/scoredetails?id=" + parseInt(prompt("Nhập số")),
    async: false,
    success: function (data) {
        div = document.createElement("div")
        div.insertAdjacentHTML( 'beforeend', data );      
        x = div.getElementsByClassName("question-box");
        for(i=0;i<x.length;i++){
             ques = getText(x[i].getElementsByClassName("col-11 question-box-title")[0].querySelectorAll('span,sub'))
            if(x[i].getElementsByTagName("img").length == 4){
                if(x[i].getElementsByClassName("text-primary")[0] != null)
                    ans.push([ques,x[i].getElementsByClassName("text-primary")[0].parentNode.nextElementSibling.getElementsByTagName("img")[0].alt])
                else
                    ans.push([ques,x[i].getElementsByClassName("text-success")[1].parentNode.nextElementSibling.getElementsByTagName("img")[0].alt])
                continue
            }
            if(x[i].getElementsByClassName("text-primary")[0] != null)
                ans.push([ques,getText(x[i].getElementsByClassName("text-primary")[0].parentNode.nextElementSibling.querySelectorAll('span,sub'))])
            else
                ans.push([ques,getText(x[i].getElementsByClassName("text-success")[1].parentNode.nextElementSibling.querySelectorAll('span,sub'))])
        }
    }
});
var buttons = document.querySelectorAll('input[type="radio"]')
x = document.getElementsByClassName("question-box")
for(i=0;i<x.length;i++){
    ques = getText(x[i].getElementsByClassName("col-11 question-box-title")[0].querySelectorAll('span,sub'))
    ansList = x[i].querySelectorAll('input[type="radio"]')
    ansList2 = []
    for(l=0;l<4;l++){
        if(ansList[l].parentNode.nextElementSibling.getElementsByTagName("img").length)
            ansList2.push(ansList[l].parentNode.nextElementSibling.getElementsByTagName("img")[0].alt)
        else
            ansList2.push(getText(ansList[l].parentNode.nextElementSibling.querySelectorAll('span,sub')))
    }
    var j=0;
    for(j=0;j<ans.length;j++){
        if(ques.substr(0,40) == ans[j][0].substr(0,40) && ansList2.includes(ans[j][1]))
            break;
    }
    if(j==x.length){
        console.log("Có vấn đề với câu " + (i+1).toString() + ". Bạn có thể tự làm lại câu đó nhé!")
        continue
    }
    for(k=0;k<4;k++){
        if(ansList[k].parentNode.nextElementSibling.getElementsByTagName("img").length && ans[j][1] == ansList[k].parentNode.nextElementSibling.getElementsByTagName("img")[0].alt)
            ansList[k].onclick()
        else if(ans[j][1] == getText(ansList[k].parentNode.nextElementSibling.querySelectorAll('span,sub')))
            ansList[k].onclick()
    }
}
