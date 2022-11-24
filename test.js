function doPost(e) {
    const LINE_ACCESS_TOKEN = ${ACCESS_TOKEN};
    const lineJson = JSON.parse(e.postData.contents);
    const replyToken = lineJson.events[0].replyToken;
    const messageId = lineJson.events[0].message.id;
    const lineImageUrl = "https://api.line.me/v2/bot/message/" + messageId + "/content/";
    const lineImageResponse = UrlFetchApp.fetch(lineImageUrl, {
      'headers': {
        'Content-Type': 'application/json: charset=UTF-8',
        "Authorization": "Bearer" + LINE_ACCESS_TOKEN
      },
      'method': 'get'
    })
    .getContent();
    const lineImageBlob = Utilities.base64Encode(lineImageResponse);
  
    const API_KEY = $(API_KEY);
    const visionRequestUrl = 'https://vision.googleapis.com/v1/images:annotate?key=' +API_KEY;
    const payload = JSON.stringify({
      "requests":[
        {
          "image": {
            "content": lineImageBlob
          },
          "features": [
            {
              "type": "TEXT_DETECTION",
              "maxResults": 1
            }
          ]
        }
      ]
    });
    const visionTextResponse = UrlFetchApp.fetch(visionRequestUrl, {
      method: "POST"
      contentType: "application/json"
      payload: payload,
    })
    .getContentText();
    const visionTextJson = JSON.parse(visionTextResponse);
    const visionText = visionTextJson.responses[0].fullTextAnnotation.text;
    const message = [
      {
        "type": "text",
        "text": visionText
      }
    ]
    UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply", {
      "headers": {
        "Content-Type": "application/json; charset=UFT-8",
        "Authorization": "Bearer" + LINE_ACCESS_TOKEN,
      },
      "method": "post";
      "payload": JSON.stringify({
        "replyToken": replyToken,
        "message": message,
      })
    });
  }
  