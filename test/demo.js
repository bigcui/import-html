
function requestHtml(url) {

    let useragent = navigator.userAgent.includes('Android');
    if (useragent || !navigator.userAgent.includes('iPhone')) {
        return new Promise((resolve, reject) => {

            var request = new XMLHttpRequest();
            var method = 'GET';

            request.open(method, url);
            request.send(null);
            request.onreadystatechange = function () {
                if (request.readyState == 4) {
                    resolve(request.responseText);
                }
                else {
                    reject('ajax error'+ request.readyState +'-'+ request.status);
                }

            };
        });
    }
    else {
        return new Promise((resolve, reject) => {
            fetch(url).then(function (response) {
                return response.text();
            }).then(data => {
                resolve(data);
            }).catch(e => {
                console.error('fetch', e);
            });
        });
    }
}
document.querySelector('button').onclick = function () {
    // document.querySelector('.app').innerHTML = ``;
    requestHtml('./tpl.html').then(e => {
        console.log(e);
    });
};
