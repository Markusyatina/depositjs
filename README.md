depositjs
=========

Helper for depositfiles.ru. Moved from [http://userscripts.org/scripts/show/132113](http://userscripts.org/scripts/show/132113). 

## ВНИМАНИЕ

Для корректной работы нужно изменить User-Agent.

### Opera (Presto)
* Установите значение opera:config#ISP|Id в DepositFiles/FileManager 0.9.9.206
* Перезагрузитесь

### Firefox
* Скопируйте текущее значение User-Agent из вкладки [about:](about:)
* Откройте вкладку [about:config](about:config)
* Найдите параметр **general.useragent.override** (создайте, если его нет)
* Вставьте скопированное значение User-Agent и добавьте строку **DepositFiles/FileManager 0.9.9.206**

###Chrome
* Запустите браузер с опцией "-user-agent=$agent", где **$agent** равняется новому User-Agent. Узнайте текущее значение User-Agent на вкладке [chrome://version](chrome://version), скопируйте и добавьте строку **DepositFiles/FileManager 0.9.9.206**