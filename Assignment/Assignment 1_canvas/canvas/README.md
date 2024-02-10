# Software Studio 2021 Spring
## Assignment 01 Web Canvas
### 108062213 顏浩昀


### Scoring

| **Basic components**                             | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Basic control tools                              | 30%       | Y         |
| Text input                                       | 10%       | Y         |
| Cursor icon                                      | 10%       | (partial) |
| Refresh button                                   | 10%       | Y         |

| **Advanced tools**                               | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Different brush shapes                           | 15%       | Y         |
| Un/Re-do button                                  | 10%       | Y         |
| Image tool                                       | 5%        | Y         |
| Download                                         | 5%        | Y         |

| **Other useful widgets**                         | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Name of widgets                                  | 1~5%     | N         |


---

### How to use 
**基本操做：（順序：按鍵左至右、上至下）**

    1.pencil：代表一般小畫家的筆刷，可以透過width調整筆刷粗細。

    2.rectangle：點選後可於canvas上畫出空心矩形，可透過width調整編框粗細。

    3.circle：點選後可於canvas上畫出空心圓形，可透過width調整編框粗細。

    4.triangle：點選後可於canvas上畫出實心三角形。

    5.eraser：點選後可將canvas上元素擦去，可透過width調整擦拭範圍。

    6.refresh：點選後可開啟一個新的canvas。

    7.Text：點選後可於canvas上點選一處打字，按下enter代表該字串結束。可透過font改變字型、size改變字體大小（範圍1~100）。

    8.undo：點選後可回到上一步的動作。

    9.redo：點選後可取消undo動作。

    10.download：可將目前的canvas，以"Canvas.png"下載至"下載項目"。

    11.upload：可傳送本地端的png檔及jpeg檔，並會顯示於canvas上。

    12.color：可選擇顏色，顏色將會套用至pencil、各圖形及文字上。
    
    13.cursor icon : 僅在文字輸入時會更改cursor icon，其餘皆為'cross hair'

**注意事項**

    1.若執行undo後（timeline_A）選擇其他功能（pencil、圖形、eraser... timeline_B），下一次的undo會回到timeline_A的狀態，並且在timeline_B時是不能使用redo的。

    2.upload的檔案格式限制於.png .jpg .jpeg .jpe。

    3.若Text打完沒有按enter鍵，下次的undo將會把這些字與其他動作一起還原（視為同一動作）。

    4.pencil及eraser的undo是以放開一次滑鼠為一次動作。

### Gitlab page link

    page URL : "https://108062213.gitlab.io/AS_01_WebCanvas"

<!-- <style>
table th{
    width: 100%;
}
</style> -->