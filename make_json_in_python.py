# -*- coding: utf-8 -*-
"""
Created on Sat Jul 12 20:28:12 2025

@author: Kamila
"""

#make an airport dictionary ex {0:BLI,...}
airport_string = 'BLIPDXEUGMFROAKSCKFATMRYSMXLAXSNAPSPSANRNOLASPHXIWAGEGPSCGPIGTFMSOBZNBIL\
BOIIDAPVUGJTDENELPEYWSATAUSLRDMFEHOUMOTGFKBISFARRAPFSDOMAGRIICTTULOKCSTCMSPDSMCIDMLIMCI\
SGFXNALITSHVMSYATWRFDMDWPIABMISPIBLVTVCGRRFNTSBNTOLFWAINDEVVSDFVPSBNAMEMPIEBGRPBGPSM\
BOSPVDROCSYRALBIAGELMSWFABEEWRCAKMDTPITDAYLCKHGRBWICVGCKBIADHTSROARICORFLEXTRIGSOSRQ\
TYSAVLUSACHAGSPMYRCHSSAVJAXSFBMLBPBIFLLPGD'
airport_names = []
for i in range(123):
    airport_names.append(airport_string[:3])
    airport_string = airport_string[3:]
print(airport_names)



airport_dict="["
with open('C:/Users/Kamila/OneDrive/Desktop/JS_MapGame/data.txt', 'r') as fp:
    for line in fp:
        print(line)
        split_line = line.split(',')
        airport_dict=airport_dict+'{"airport": "'+airport_names[int(split_line[2])]+'", "imageCode":'+str(split_line[2])+', "x": '+split_line[1]+', "y": '+split_line[0]+'},'
        


final = airport_dict[:-1]+"]"

with open("C:/Users/Kamila/OneDrive/Desktop/JS_MapGame/output.txt", "w") as text_file:
    text_file.write(final)       