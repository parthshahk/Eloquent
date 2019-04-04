var contextMenuItem = {
    "id": "word",
    "title": "Find Meaning",
    "contexts": ["selection"]
}

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(data => {
    if(data.menuItemId == "word"){
        console.log(data.selectionText)
    }
});