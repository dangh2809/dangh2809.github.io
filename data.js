const vietnamese_words = [
    "Anh",
"Bàn",
"Cái",
"Điện thoại",
"Em",
"Gấu",
"Hoa",
"Iphone",
"Kẹo",
"Lá",
"Mẹ",
"Nước",
"Ô tô",
"Phở",
"Quần",
"Rau",
"Sách",
"Thẻ",
"Ứng dụng",
"Vé",
"Xe bus",
"Yêu",
"Zoo",
"Áo",
"Bé",
"Cắt",
"Đèn",
"Gió",
"Hình",
"Kính",
"Lạnh",
"Mâm",
"Ngọt",
"Ong",
"Phòng",
"Quần áo",
"Rau củ",
"Sổ",
"Tắm",
"Ứng viên",
"Vàng",
"Xe đạp",
"Yoga",
"Zin",
"Ảnh",
"Béo",
"Chân",
"Đồng hồ",
"Ếch",
"Giói",
"Hình vuông",
"Kịch",
"Lời",
"Máy bay",
"Ngôi nhà",
"Ông",
"Phở bò",
"Quạt",
"Rễ",
"Sân bay",
"Tết",
"Ứng phó",
"Vận động viên",
"Xe máy",
"Yếm",
"cà chua",
"Ấm",
"Bình",
"Cháy",
"Đội",
"Ếch xanh",
"Giò",
"Học",
"Ỉu",
"Kiếm",
"Lửa",
"Máy chụp ảnh",
"Ngỗng",
"Ông bà",
"Phở gà",
"Quả",
"Rượu",
"Sáng",
"Từ",
"Ứng xử",
"Xe tải",
"Yến",
"Zin đậu xanh",
"Ấn tượng",
"Bình minh",
"Chân dung",
"Đời",
"Ếch đồng",
"Giày",
"Học sinh",
"Áo khoác",
"Bàn làm việc",
"Cây tre",
"Điện thoại thông minh",
"Em trai",
"Gió mùa",
"Hoa sen",
"Kính râm",
"Lá dừa",
"Máy tính xách tay",
"Nước mắm",
"Ô tô hơi",
"Phở bò tái",
"Quả dứa",
"Rau đay",
"Sách tham khảo",
"Thẻ thành viên",
"Ứng dụng di động",
"Vé xem phim",
"Xe đạp đôi",
"Yến đỏ",
"chuối",
"Áo len dài tay",
"Bàn trang điểm",
"Cây lúa",
"Đèn trần",
"Ểu đen",
"Giày thể thao",
"Hình khối",
"Ích kỷ nhất",
"Kính mắt",
"Làm việc",
"Mâm quýt",
"Ngọt ngào hương",
"Ong bắp cày",
"Phòng khách",
"Quần áo mùa hè",
"Rau cải thảo",
"Sổ bảo hiểm",
"Tắm biển",
"Ứng viên chất lượng",
"Vàng 24k",
"Xe đạp đua",
"Yoga ball",
"Zin dừa",
"Ảnh đẹp trai",
"Bé yêu quý",
"Chân trời xa",
"Đồng hồ đeo tay",
"Ếch xanh",
"Gió đông",
"Hình vuông đều",
"Ỉn trắng",
"Kịch hay",
"Lời chúc",
"Máy bay quân sự",
"Ngọn núi cao",
"Ông bà nội ngoại",
"Phở gà ngon",
"Quạt trần thông gió",
"Rễ rễ cây",
"Sân bay quốc tế",
"Tết trung thu",
"Ứng phó khẩn cấp",
"Vận động viên bóng đá",
"Xe máy số",
"Yếm",
"Ánh trăng",
"Bàn ghế",
"Cây thông",
"Điện thoại thông minh",
"Em gái",
"Gió mát",
"Hoa mai",
"iPad Pro",
"Kính bảo hộ",
"Lá dứa",
"Máy tính",
"Nước biển",
"Ô tô điện",
"Phở gà hầm",
"Quả cam",
"Rau muống",
"Sách giáo trình",
"Thẻ tín dụng",
"Ứng dụng di động",
"Vé concert",
"Xe cứu thương",
"Yến sào",
"Zin mận",
"Áo len",
"Bàn làm việc",
"Cây trái",
"Đèn pin",

"Giày cao gót",
"Hình học",
"Ích kỷ thượng đế",
"Kính mờ",
"Lạnh lẽo",
"Mâm xôi",
"Ngọt ngào môi",
"Ong chúa",
"Phòng học",
"Quần áo đông",
"Rau diếp cá",
"Sổ hộ khẩu",
"Tắm nắng",
"Ứng viên chính trị",
"Vàng ròng",
"Xe đạp địa hình",
"Yoga mat",
"Zin sữa chua",
"Ảnh đẹp",
"Bé yêu",
"Chân đất",
"Đồng hồ thông minh",
"Ếch con",
"Gió biển",
"Hình chữ nhật",
"Kịch độc",
"Lời ca",
"Máy bay quân sự",
"Ngọn đồi",
"Ông bà ngoại",
"Phở gà nóng hổi",
"Quạt trụ",
"Rễ rễ",
"Sân bay quốc nội",
"Tết dương lịch",
"Ứng phó tình huống",
"Vận động viên điền kinh",
"Xe máy ga",
"Yếm đỏ",
"Zin dứa",
"Ấm lòng",
"Bình hoa",
"Cháy rừng",
"Đội quân",
"Ánh sáng",
"Bàn chân",
"Cái hộp",
"Điện thoại di động",
"Em bé",
"Gương mặt",
"Hoa hồng",
"Ipad",
"Kính mát",
"Lá cây",
"Mẹ",
"Nước mắt",
"Ô tô hơi",
"Phở bò",
"Quả chuối",
"Rau cải",
"Sách vở",
"Thẻ sinh viên",
"Ứng dụng điện thoại",
"Vé máy bay",
"Xe buýt",
"Yêu thương",
"Zoo vườn bách thú",
"Áo sơ mi",
"Bàn tròn",
"Cây cỏ",
"Đèn bàn",
"Ểu quạ",
"Giọng hát",
"Hình ảnh",
"Ích kỷ",
"Kính râm",
"Làm lạnh",
"Mâm quả",
"Ngọt ngào",
"Ong bắp cày",
"Phòng ngủ",
"Quần áo thể thao",
"Rau xanh",
"Sổ tay",
"Tắm rửa",
"Ứng viên tuyển dụng",
"Vàng đúc",
"Xe đạp đua",
"Yến mạch",
"Zin cà rốt",
"Ảnh chân dung",
"Béo phì",
"Chân trời",
"Đồng hồ đeo tay",
"Ếch nhái",
"Gió lạnh",
"Hình vuông",
"Kịch bản",
"Lời khuyên",
"Máy bay trực thăng",
"Ngọn núi",
"Ông bà nội",
"Phở gà nước lèo",
"Quạt trần",
"Rễ cây",
"Sân bay quốc tế",
"Tết Nguyên đán",
"Ứng phó khẩn cấp",
"Vận động viên thể thao",
"Xe máy côn tay",
"Yếm truyền thống",
"đậu phộng",
"Ấm áp",
"Bình nước",
"Cháy cháy",
"Đội tuyển bóng",
"Áo len đen",
"Bàn tròn",
"Cây cỏ",
"Điện thoại di động",
"Em bé trai",
"Gió mát",
"Hoa hồng đỏ",
"Kính râm đen",
"Lá cây xanh",
"Máy tính bảng",
"Nước mắt khóc",
"Ô tô con",
"Phở bò chín",
"Quả cam chín",
"Rau muống xào",
"Sách vở giáo trình",
"Thẻ thành viên",
"Ứng dụng di động",
"Vé máy bay",
"Xe buýt công cộng",
"Yến sào tự nhiên",
"chuối chín",
"Áo sơ mi trắng",
"Bàn làm việc gỗ",
"Cây trái nhiệt đới",
"Đèn bàn đọc sách",
"Giày thể thao nam",
"Hình học đa giác",
"Ích kỷ ích kỷ",
"Kính mắt tròng",
"Lạnh lẽo giá rét",
"Mâm quả tươi ngon",
"Ngọt ngào tình yêu",
"Ong bắp cày mật",
"Phòng ngủ thoáng mát",
"Quần áo thể thao",
"Rau diếp cá xanh",
"Sổ tay ghi chú",
"Tắm nước ấm",
"Ứng viên tài năng",
"Vàng ròng 24k",
"Xe đạp địa hình",
"Yoga mat màu xanh",
"Ảnh chân dung đẹp",
"Bé yêu dấu",
"Chân trời xa xăm",
"Đồng hồ đeo tay nam",
"Ếch nhái xanh lục",
"Gió mùa đông rét",
"Hình vuông cạnh bằng",
"Kịch bản độc đáo",
"Lời chúc tốt đẹp",
"Máy bay quân sự",
"Ngọn núi ca",
"Áo khoác đen",
"Bàn học",
"Cây thông xanh",
"Điện thoại di động",
"Em bé gái",
"Gió mùa hè",
"Hoa đào đỏ",
"iPad",
"Kính râm mắt",
"Lá cây vàng",
"Máy tính xách tay",
"Nước hoa quả",
"Ô tô đỏ",
"Phở gà nóng",
"Quả dứa chín",
"Rau xà lách",
"Sách giáo khoa",
"Thẻ thành viên",
"Ứng dụng di động",
"Vé xem concert",
"Xe đạp đơn",
"Yến sào tươi",
"Zin chuối chín",
"Áo len trắng",
"Bàn làm việc gỗ",
"Cây trái mùa",
"Đèn bàn đọc sách",
"Ểu trắng",
"Giày cao gót nữ",
"Hình học đa tạp",
"Ích kỷ tự thân",
"Kính mắt cận",
"Lạnh lẽo mùa đông",
"Mâm quả chín",
"Ngọt ngào tình yêu",
"Ong bắp cày mật ngọt",
"Phòng khách sang trọng",
"Quần áo thể thao",
"Rau diếp cá tươi",
"Sổ hộ khẩu",
"Tắm nắng",
"Ứng viên tiềm năng",
"Vàng ròng 24k",
"Xe đạp đua",
"Yoga mat màu tím",
"dừa tươi",
"Ảnh đẹp tự nhiên",
"Bé yêu dấu",
"Chân trời xa xăm",
"Đồng hồ đeo tay nữ",
"Ếch nhái xanh",
"Gió mùa đông rét",
"Hình vuông đều",
"mực đen",
"Kịch độc đáo",
"Lời chúc tốt đẹp",
"Máy bay quân sự",
"Ngọn núi cao",
"Ông bà nội ngoại",
]
const animals=[
    "Lion",
"Elephant",
"Tiger",
"Giraffe",
"Horse",
"Dog",
"Cat",
"Bear",
"Kangaroo",
"Monkey",
"Zebra",
"Penguin",
"Snake",
"Dolphin",
"Rabbit",
"Gorilla",
"Leopard",
"Owl",
"Cheetah",
"Panda",
]

const words = {
    "Easy": [
        "ghost","smile","clock","camera","leg","blocks","chair","lion","dragon","snail","computer","sea","zoo","snowflake","wheel","helicopter","diamond","bow","doll","bird","jacket","egg","airplane","hand","pencil","motorcycle","starfish","comb","dream","candle","hippo","popsicle","line","bell","chicken","fork","crack","pig","stairs","king","water","circle","bowl","ant","kite","zebra","float","ants","cup","person","milk","snake","swimming pool","oval","bridge","monster","girl","blanket","boat","ocean","balloon","crayon","river","sheep","broom","rabbit","bone","basketball","hamburger","ball","orange","bus","ear","island","slide","duck","head","owl","zigzag","ship","chimney","seashell","cloud","mountains","leaf","cheese","beak","backpack","boy","bounce","heart","bike","octopus","monkey","cow","sunglasses","alive","truck","plant","shoe","hair","daisy","ladybug","train","suitcase","desk","kitten","banana","apple","sea turtle","turtle","flower","love","finger","spoon","neck","bathroom","skateboard","lemon","bumblebee","robot","whale","flag","mouse","bed","triangle","purse","caterpillar","baby","butterfly","woman","bracelet","ears","worm","lips","dog","jail","house","rocket","snowman","mitten","lollipop","nose","night","hook","bunny","bunk bed","elephant","bread","book","pillow","door","feather","bark","branch","bug","man","pizza","mouth","carrot","horse","frog","glasses","eyes","cupcake","jar","rain","hat","spider","star","football","square","corn","mountain","window","drum","pie","cookie","knee","face","tree","coat","pen","box","family","cube","arm","music","inchworm","jellyfish","grapes","rainbow","fish","rock","giraffe","tail","alligator","Mickey Mouse","fly","baseball","cherry","car","fire","candy","lizard","bat","crab","shirt","feet","coin","legs","curl","socks","table","ice cream cone","swing","eye","key","cat","bear","button","lamp","spider web","angel","ring","light","pants","Earth","bee","dinosaur","sun","moon","grass","bench","beach","nail",
        "bee","bug","orange","bear","crayon","ear","starfish","octopus","ball","duck","mouse","dinosaur","table","jail","face","nail","zebra","knee","person","chair","feet","snowman","swimming pool","boy","rainbow","jar","elephant","leg","bike","branch","cookie","cheese","window","button","finger","mountains","pie","dragon","backpack","love","plant","boat","mitten","girl","tail","bunk bed","desk","truck","hat","rabbit","mountain","shirt","bumblebee","legs","purse","worm","broom","bathroom","lamp","house","spider","spoon","horse","robot","nose","bunny","cow","airplane","glasses","sea","butterfly","corn","snail","blocks","basketball","popsicle","king","cherry","rain","lizard","rocket","pen","chicken","ocean","carrot","neck","drum","dog","car","banana","jellyfish","fire","sheep","bridge","baseball","monkey","hippo","ants","pig","pencil","hair","ring","lollipop","curl","man","caterpillar","turtle","bat","pants","crab","ice cream cone","crack","pizza","island","ship","milk","ladybug","skateboard","socks","lion","star","box","suitcase","giraffe","heart","triangle","frog","comb","egg","football","baby","arm","inchworm","cube","bow","monster","bell","family","kite","sunglasses","water","hamburger","slide","shoe","zigzag","book","fish","bird","rock","head","wheel","smile","sun","owl","fork","motorcycle","snowflake","swing","music","camera","coin","night","moon","whale","cloud","flower","balloon","jacket","bounce","daisy","key","hook","cat","light","woman","snake","fly","beak","alive","mouth","pillow","computer","Mickey Mouse","apple","leaf","feather","lips","chimney","ant","bed","doll","helicopter","alligator","spider web","hand","bone","bus","circle","cupcake","tree","clock","ghost","angel","eye","blanket","grass","seashell","bowl","candy","stairs","bracelet","train","lemon","beach","Earth","door","float","cup","river","eyes","bark","oval","diamond","line","square","zoo","grapes","coat","bread","dream","sea turtle","flag","candle","kitten","bench","ears",
        "chicken","bowl","mountain","sun","comb","duck","pen","beach","leg","basketball","hamburger","house","roly poly\/pill bug\/doodle bug","spoon","helicopter","kite","bumblebee","swimming pool","dog","jar","bunny","socks","bed","car","alive","rain","boy","owl","diamond","float","balloon","smile","swing","glasses","crayon","bug","lizard","corn","cube","head","flower","ears","hat","shirt","mountains","skateboard","lemon","Earth","ship","box","leaf","rabbit","ring","neck","ear","pillow","inchworm","curl","frog","hand","broom","cupcake","coat","ice cream cone","tail","orange","drum","cow","motorcycle","bird","rocket","sheep","milk","camera","person","hair","plant","bone","fairplane","heart","caterpillar","mouth","candy","robot","branch","ocean","fish","ghost","cup","nose","hippo","shoe","ball","baby","bridge","computer","jacket","bat","oval","grapes","snowflake","river","lollipop","sea","seashell","island","sunglasses","rock","legs","nail","whale","feet","zebra","truck","pants","lips","fly","pie","butterfly","bike","egg","dinosaur","daisy","grass","face","ants","key","man","triangle","bark","pig","table","love","button","door","spider web","mitten","crack","coin","jellyfish","water","spider","woman","kitten","feather","banana","bow","carrot","boat","cloud","hook","pizza","bee","finger","beak","square","wheel","cat","fire","apple","jail","alligator","ant","octopus","arm","snowman","cherry","pencil","light","purse","eye","window","music","lamp","knee","star","train","bell","popsicle","bench","desk","tree","chair","lion","line","ladybug","cheese","snake","book","dream","starfish","moon","turtle","night","girl","family","elephant","flag","bathroom","snail","worm","candle","cookie","bunk bed","zigzag","crab","bread","suitcase","blocks","football","dragon","backpack","clock","eyes","stairs","monster","monkey","rainbow","angel","king","baseball","sea turtle","zoo","bracelet","blanket","slide","bus","doll","horse","giraffe","Mickey Mouse","circle","fork","mouse","bounce","bear","chimney",
        "bathroom","pillow","blocks","dragon","eyes","square","jacket","cherry","pants","bumblebee","bee","love","crayon","lemon","bark","skateboard","broom","milk","comb","finger","glasses","oval","ocean","spider","socks","carrot","heart","nail","sun","leaf","ear","king","hand","boat","island","snail","suitcase","cookie","elephant","nose","coat","rock","rain","wheel","horse","bat","beak","shoe","box","light","sunglasses","tail","mountain","pen","spider web","cow","fly","camera","whale","triangle","button","circle","bunny","truck","crab","baseball","mitten","jellyfish","river","backpack","ice cream cone","dog","caterpillar","dream","ears","bench","window","lizard","bracelet","computer","blanket","shirt","football","man","swing","branch","drum","flag","arm","banana","lion","boy","book","robot","helicopter","mouse","mountains","chicken","Mickey Mouse","candle","plant","candy","worm","beach","kite","knee","bug","baby","alligator","giraffe","lips","jar","ghost","clock","curl","bell","pizza","ants","rainbow","train","eye","pig","sheep","bus","turtle","doll","feet","chair","crack","house","bounce","swimming pool","inchworm","bed","hippo","balloon","night","neck","face","grass","orange","zebra","cube","lamp","bear","popsicle","desk","frog","hamburger","bridge","angel","owl","snake","music","hair","smile","legs","moon","sea turtle","bow","jail","bread","cloud","head","coin","spoon","zigzag","rocket","kitten","star","apple","ship","bone","diamond","mouth","key","grapes","slide","egg","hook","float","line","rabbit","snowman","bird","daisy","leg","duck","table","hat","pie","fire","woman","cupcake","motorcycle","bowl","ball","feather","car","bunk bed","sea","alive","chimney","starfish","ant","monster","girl","pencil","zoo","dinosaur","person","fork","cat","flower","monkey","Earth","door","bike","seashell","cheese","family","corn","purse","cup","ring","tree","butterfly","water","stairs","snowflake","lollipop","basketball","fish","octopus","ladybug"
    ],
    "Medium": [
        "pond","tooth","paw","attic","crib","wall","slide","powder","panda","mirror","porthole","yo-yo","hairbrush","breakfast","anemone","claw","cracker","stick","detective","spool","pendulum","hospital","sheep","crumb","blue jeans","lipstick","electricity","road","empty","minivan","sky","fan","curtain","tennis","mail","drill","carousel","crack","bomb","reindeer","paper clips","back","DVD","tongue","toast","mailman","drawer","bowtie","gum","face","buggy","wheelchair","snowboarding","shake","shoulder","crown","stomach","wrist","spill","party","astronaut","tricycle","outer space","printer","lap","hurdle","colored pencil","babysitter","coat","window","unicycle","floor","newborn","tongs","tractor","turkey","room","needle","lip","baggage","eraser","free","bald eagle","maze","magic","porch","french fries","orange","rocket","subway","rain","magazine","ring","muffin","hot-air balloon","photograph","coin","hip","dig","baby","seed","ship","doctor","rib","zookeeper","chess","start","summer","torch","birthday cake","mouse","fishing pole","city","muscle","ocean","gravity","helium","bell","hopscotch","sand","cage","dinner","fanny pack","brain","palace","chameleon","contain","beach","spoon","angel","plate","run","tank","pickle","soap","read","chimney","well","college","oven","ice","calendar","banjo","soccer","rug","bag","blimp","pogo stick","chain","mask","banana peel","soda","golf","cash","nail","cheek","gasoline","half","waist","tire","pop","gold","coal","cardboard","barn","magic carpet","dirt","scarecrow","drumstick","parachuting","shadow","trap","spear","ticket","ladybug","rattle","watch","video camera","nest","hula hoop","insect","faucet","treasure","skate","coil","watering can","graph","target","seahorse","cobra","tent","ribbon","soup","dump truck","flute","black widow","unicorn","frog","hotel","wood","cell phone","spider web","list","class","ironing board","farmer","open","drums","celery","password","toy","lifejacket","rose","ink","goat","hill","package","wax","lobster","button","garbage",
        "wrench","pretzel","baker","bucket","pencil","shipwreck","porcupine","sack","river","narwhal","positive","cook","outside","field","taxi","thief","lamp","tiger","go","helicopter","iPad","sword","sunflower","railroad","piano","marker","flashlight","music","birthday","sail","hair dryer","wheelbarrow","pea","pocket","canoe","cucumber","jelly","sprinkler","broccoli","bagel","tub","wedge","sushi","prince","bat","cactus","wooly mammoth","chip","tip","scar","teeth","quarter","television","fork","penguin","pot","fax","t-shirt","chalk","school","sock","farm","juice","poodle","notepad","king","fungus","swim","computer","inch","root","robin","top hat","quadruplets","honey","girlfriend","kitchen","hook","saltwater","kite","pitchfork","nun","beehive","sleep","waterfall","dominoes","three-toed sloth","cliff","parka","pan","spell","yarn","pail","whisk","tower","gumball","trophy","bus","highway","lawn mower","gap","art","jewelry","goblin","pilot","shovel","laundry basket","electrical outlet","flagpole","shampoo","vase","wick","twig","flood","baseball","throne","coyote","mouse pad","straw","toe","aquarium","children","ambulance","merry-go-round","motorcycle","oar","curb","ladder","popsicle","oil","garden","pineapple","rat","pancake","sleeve","lunchbox","dolphin","page","blueprint","lightsaber","stem","gift","scissors","crow","pen","mailbox","heel","meteor","hot dog","monkey","howl","kettle","shelf","mushroom","cello","harmonica","third plate","ask","pear","glove","fang","sit","bathtub","alarm clock","radish","rhinoceros","bike","rope","toilet paper","harp","peck","ping pong","barrel","rolly polly","belt","dragon","kiss","sunset","limousine","puzzle","hurricane","lung","draw","fruit","thumb","easel","light bulb","wreath","bathroom scale","nature","kayak","butcher","lemon","lock","dimple","hair","cemetery","jump","jungle","throat","doghouse","refrigerator","quilt","cover","peach","scientist","bagpipe","toaster","wallet","stingray","pine tree","sailboat","doormat","silverware","latitude","stocking",
        "storm","milk","see","germ","sunburn","money","banana split","save","jail","dock","leak","dustpan","penny","brush","box","pinecone","rowboat","spare","dad","towel","plank","puddle","stroller","mud","hero","washing machine","seashell","skirt","braid","corner","donkey","chin","beaver","horse","knight","queen","jar","yacht","trumpet","grandma","bell pepper","cave","marry","time","coconut","bottle","family","paint","glass","tie","happy","necktie","dollar","paperclip","store","maid","sandal","monster","park","peanut","growl","horn","newlywed","loaf","eagle","trunk","neck","gate","starfish","bib","yardstick","submarine","mouth","goose","knot","screwdriver","cape","wagon","homeless","pirate","catfish","firefighter","cub","rock","magnet","cockroach","meat","rake","map","pool","mop","deep","circus","shade","garbage truck","rocking chair","spine","sidekick","elbow","seal","escalator","America","waffle","camera","rainbow","stove","librarian","sink","stump","sign","stork","present","bicycle","carpet","spot","safety goggles","light switch","fire hydrant","cul-de-sac","strap","safe","drink","brick","purse","daddy longlegs","door","pinwheel","fur","sister","hiss","umbrella","eclipse","church","curve","tightrope","anvil","suitcase","salt","trampoline","cricket","locket","neighbor","flamingo","orphan","cheerleader","string","roof","school bus","onion","basket","sleeping bag","forehead","hug","whistle","swing","vest","doorknob","cake","shallow","newspaper","pumpkin","skateboard","restaurant","battery","trip","chart","mold","black hole","artist","mini blinds","sneeze","clam","coast","bushes","clownfish","glue","gingerbread man","hail","knee","unite","key","day","island","molecule","lawnmower","wreck","truck","goldfish","corn dog","swimming pool","surfboard","pet","zipper","teacher","razor","fist","rice","song","state","stoplight","campfire","base","cheetah","stamp","shower","TV","tuba","notebook","table","library","slope","aircraft","pajamas","bakery","dragonfly","eye patch","vegetable","bubble",
        "lake","pantry","crayon","closed","plug","hen","parachute","frame","elevator","enter","noon","potato","giant","organ","hippopotamus","princess","tusk","scale","pillowcase","timer","constellation","snowball","nurse","shape","batteries","sea turtle","clown","cabin","weight","hammer","iron","east","letter","hourglass","aunt","bacteria","north","ferry","front porch","janitor","seaweed","quicksand","globe","windshield","smile","dress","cougar","spaceship","tadpole","castle","candle","solar system","windmill","earmuffs","round","telephone","cobweb","spring","step","melt","jet ski","liquid","envelope","platypus","snowflake","volcano","picture frame","sunglasses","cast","pulley","apple pie","snail","toothbrush","zoo","food","tulip","playground","roller blading","chef","movie theater","paper","smoke","lucky","hoof","garage","pie","lighthouse","salt and pepper","forest","frying pan","worm","match","mug","shark","saddle","violin","collar","pollution","saw","saxophone","cotton candy","fin","blowfish","lid","compass","rainstorm","sidewalk","teapot","tissue","hummingbird","corn","trapeze","piranha","hole","pizza","chocolate chip cookie","tape","equator","eel","tail","stain","skunk","net","crust","ski","extension cord","boot","owl","jacket","cork","fairies","wing","chest","mitten","fox","mattress","propeller","airport","napkin","corndog","plant","manatee","zebra","Ferris wheel","curtains","headband","pelican","museum","puppet","hunter","guitar","middle","connect","blanket","nut","bug spray","crater","dog leash","cheeseburger","shopping cart","cannon","address","marshmallow","elephant","squirt gun","strawberry","stapler","deer","scarf","wave","cowboy","grape","squirrel","apologize","desert","fern","sponge","pipe","cocoon","thermometer","popcorn","race car","feast","backbone","ceiling fan","hockey","log","trash can","grill","snow","desk","seesaw","Jupiter","full moon"
    ],
    "Hard": [
        "limit","propose","pilot","Quidditch","edge","record","stadium","competition","roller coaster","flock","script","pizza sauce","crime","deliver","somersault","density","cello","art gallery","florist","deep","goalkeeper","cape","company","Jedi","time","toll road","thief","edit","dizzy","rib","pocket","carpenter","ceiling fan","stuffed animal","partner","barbershop","synchronized swimming","actor","snore","poison","vacation","turtleneck","coach","government","earache","ski goggles","flu","coil","parade","hail","postcard","water buffalo","toddler","yawn","great-grandfather","blueprint","cubicle","vanish","tin","cheat","shack","lance","yak","vegetarian","myth","pharmacist","lace","applause","interception","amusement park","airport security","publisher","owner","wobble","pigpen","level","hoop","fizz","sheep dog","sushi","rut","date","lunar rover","putty","carnival","garden hose","imagine","freshman","chairman","driveway","raft","wind","bookend","sled","baggage","photosynthesis","drought","wool","hovercraft","pest","landlord","wedding cake","eighteen-wheeler","plantation","guarantee","foil","print","dodgeball","season","son-in-law","dentist","birthday","hydrogen","acrobat","plow","cruise ship","centimeter","jeans","hospital","bleach","baseboards","invent","fog","cable car","win","beanstalk","vitamin","husband","correct","degree","sugar","vehicle","expert","RV","aircraft carrier","telephone booth","boxing","handle","newsletter","mayor","blush","elf","signal","time machine","CD","testify","grocery store","bruise","yard","clown","reservoir","lullaby","fortress","rubber","stage","midnight","bargain","stutter","rhythm","dawn","suit","lap","foam","shampoo","cheerleader","stow","passenger","cellar","stage fright","softball","grandpa","frost","loveseat","tugboat","accounting","lung","homework","runoff","tide","whisk","mascot","bonnet","mast","bride","parking garage","knight","snag","bulldog","first class","wrap","speakers","barber","cushion","jazz","password",
        "salmon","quartz","double","avocado","download","trip","spare","steam","Heinz 57","plastic","fiance","front","pain","zipper","dew","cliff diving","chisel","best friend","sleep","germ","drain","vet","mime","pail","cowboy","nanny","oxcart","drugstore","athlete","devious","recycle","lumberyard","mysterious","right","yolk","caviar","pet store","videogame","swamp","dryer sheets","grasslands","school","ping pong","twist","half","weather","ounce","delivery","yacht","exercise","fur","sticky note","volleyball","surround","torch","atlas","darkness","toothpaste","glue gun","junk","thrift store","bedbug","point","scream","reveal","brand","ditch","cough","wooly mammoth","stationery","back flip","commercial","wag","mold","country","vanilla","pharaoh","ginger","baguette","sap","tank","taxidermist","glue stick","full","nightmare","tiptoe","tackle","ski lift","taxi","crate","macho","pickup truck","peasant","log-in","truck stop","printer ink","cell phone charger","stew","swing dancing","ashamed","soak","hand soap","shrew","startup","page","dance","learn","think","parent","sandpaper","snarl","hermit crab","chariot racing","tablespoon","calm","beluga whale","yodel","miner","chicken coop","nap","cardboard","crust","golf cart","cleaning spray","traffic jam","cockpit","lunch tray","coastline","cargo","recess","captain","chemical","jigsaw","thaw","landscape","glitter","zoo","neighborhood","cattle","hipster","sword swallower","shower curtain","water cycle","hour","puppet","post office","swarm","snooze","punk","concession stand","chime","diagonal","fiddle","sponge","swoop","idea","washing machine","eraser","darts","stopwatch","haircut","gold","palace","tow truck","thunder","sneeze","wax","oar","braid","wig","geologist","laundry detergent","moth","welder","quit","migrate","icicle","president","mat","hot tub","wheelie","retail","ornament","safe","bald","trail","aunt","trapped","border","economics","gas station","downpour","diver","car dealership","advertisement","gallon","staple","lie","ream","flavor","orbit",
        "chef","scuff mark","toy store","judge","cream","baby-sitter","chestnut","hang glider","customer","trombone","sandbox","gown","dripping","fast food","Internet","carat","costume","laser","fabric","heater","science","van","s'mores","cherub","fade","world","rodeo","servant","comfy","stay","sun block","obey","clog","goblin","ruby","sweater","blizzard","peace","jungle","pawn","shrink ray","scuba diving","manatee","logo","tip","electrical outlet","sash","last","black belt","juggle","headache","movie","hut","hurdle","earthquake","tag","dorsal","clique","zoom","fresh water","drawback","spaceship","conveyor belt","shelter","carpet","dashboard","monsoon","quicksand","prime meridian","rim","bobsled","balance beam","vein","omnivore","jaw","honk","runt","koala","cloak","tow","tourist","catalog","cruise","optometrist","molar","compare","ratchet","fireside","bookstore","story","cabin","chariot","ticket","sunburn","cartoon","plank","distance","boulevard","dent","dust bunny","dream","drive-through","cuckoo clock","hairspray","seat","university","banister","roommate","rind","chameleon","biscuit","song","team","arcade","prize","important","human","pile","macaroni","violent","humidity","extension cord","religion","leak","gold medal","living room","robe","engaged","mirror","character","drip","apathetic","leather","albatross","ringleader","dress shirt","crane","boa constrictor","irrigation","ivy","classroom","rudder","toolbox","geyser","pro","picnic","connection","check","drill bit","receipt","cot","gumball","kneel","plumber","disc jockey","mine","gasoline","elope","fireman pole","lecture","end zone","organ","musician","produce","prey","sweater vest","firefighter","injury","cousin","police","chain mail","quadrant","skating rink","professor","crow's nest","saddle","tearful","dead end","yardstick","taxes","chess","cure","lipstick","houseboat","factory","letter opener","groom","student","attack","sunrise","wallow","clamp","cliff","coworker","crop duster"
    ],
    "Very Hard": [
        "pastry","detail","index","doubt","semester","dispatch","title","intern","joke","silt","population","doubtful","default","mooch","destruction","society","tug","sidekick","representative","snag","president","writhe","altitude","century","telepathy","name","fun","pawnshop","inning","enemy","ma'am","one-way street","sophomore","freshwater","destination","admire","protestant","acoustics","friction","shame","first mate","stowaway","panic","doppelganger","committee","problem","mortified","quiver","carat","twang","flutter","crew","member","interject","county fair","wish","compromise","copyright","transpose","consent","comparison","vision","drift","regret","plot","practice","tinting","ice fishing","aristocrat","dud","statement","refund","license","sleet","insurance","tattle","profit","con","treatment","companion","soul","lyrics","blacksmith","courthouse","flotsam","blunt","random","water vapor","figment","fuel","cranium","rest stop","tribe","vanquish","resourceful","exponential","infection","hay wagon","reimbursement","password","community","steel drum","system","philosopher","apparatus","stun","rainwater","gravel","form","stout","VIP","hang ten","ray","punishment","nutmeg","zone defense","group","deceive","pelt","gentleman","tutor","cartography","cashier","leap year","stuff","climate","castaway","crisp","smidgen","credit","bushel","ligament","coast","fragment","history","archaeologist","grain","publisher","quarantine","texture","implode","pride","swag","positive","hearse","zip code","sickle","education","galaxy","brainstorm","wealth","disgust","inquisition","income","ornithologist","hypothermia","wormhole","income tax","wetlands","feeder road","cartoonist","digestion","fad","czar","convenience store","prepare","confidant","jig","Chick-fil-A","upgrade","Atlantis","fun house","irrational","gondola","stranger","interference","big bang theory","junk drawer","retire","today","inertia","steamboat","cramp","pen pal","landfill","welder","P.O. box","realm","opaque",
        "blueprint","translate","depth","good-bye","overture","armada","brunette","voicemail","crow's nest","wasabi","time zone","error","condition","effect","diversify","memory","channel","danger","cutlass","improve","expired","creator","incisor","parley","neutron","buccaneer","schedule","debt","slam dunk","aftermath","clue","doubloon","mayhem","kilogram","fowl","fake flowers","dugout","promise","loiterer","scalawag","flight","knowledge","ironic","tournament","whiplash","preteen","temper","language","dryer sheet","emigrate","opinion","demanding","confide","Everglades","scatter","feeling","hobby","gallop","champion","descendant","observatory","standing ovation","try","guess","mine car","paranoid","infect","discovery","lichen","handful","periwinkle","decipher","voice","emperor","bed and breakfast","property","siesta","Zen","villain","acre","guru","parody","mortal","cause","occupant","stockholder","cover","food court","gymnast","chaos","haberdashery","cubit","turret","dictate","stagecoach","duvet","employee","pomp","fathom","layover","in-law","soulmate","addendum","reward","sapphire","reaction","offstage","eureka","trawler","psychologist","organization","rhyme","trademark","rhythm","cloudburst","rival","navigate","riddle","risk","exhibition","theory","forklift","remain","zero","chord","slump",
        "coast","title","landfill","VIP","vision","consent","voice","siesta","leap year","armada","implode","voicemail","zone defense","sapphire","parody","doubtful","destruction","fake flowers","haberdashery","fragment","income tax","wetlands","ironic","paranoid","flutter","snag","clue","mooch","stranger","texture","jig","joke","sidekick","forklift","handful","vanquish","occupant","wasabi","aftermath","depth","brainstorm","punishment","wish","dud","demanding","mortified","creator","psychologist","sickle","compromise","exponential","license","president","member","grain","enemy","junk drawer","turret","steel drum","nutmeg","in-law","stun","emperor","wealth","discovery","county fair","descendant","interject","fowl","copyright","shame","opaque","error","carat","periwinkle","flight","treatment","improve","stout","trademark","brunette","food court","sleet","incisor","slump","guess","ice fishing","fathom","system","climate","fad","danger","risk","feeder road","dispatch","hang ten","dugout","rainwater","crow's nest","theory","inning","flotsam","duvet","schedule","cubit","ma'am","channel","rhyme","profit","interference","doppelganger","hay wagon","champion","disgust","inquisition","pomp","cover","prepare","refund","Chick-fil-A","courthouse","one-way street","stagecoach","parley","representative","irrational","blunt","mayhem","reward","plot","bed and breakfast","cartoonist","crisp","soul","lyrics","diversify","condition","memory","stuff","fun house","fuel","emigrate","guru","water vapor","gentleman","Everglades","translate","doubt","pawnshop","welder","inertia","observatory","doubloon","rhythm","freshwater","deceive","time zone","employee","twang","drift","P.O. box","hobby","smidgen","swag","admire","language","riddle","con","fun","addendum","society","credit","practice","population","big bang theory","ligament","gravel","regret","friction","tutor","group","philosopher","retire","convenience store","confidant","preteen","eureka","overture","resourceful","whiplash","crew","villain","semester","kilogram",
        "loiterer","mortal","wormhole","name","galaxy","temper","exhibition","castaway","pelt","cranium","debt","slam dunk","history","form","decipher","chaos","gymnast","blacksmith","problem","blueprint","aristocrat","scatter","pride","tattle","zero","tinting","comparison","destination","silt","steamboat","good-bye","effect","scalawag","committee","dictate","feeling","soulmate","dryer sheet","education","stockholder","trawler","telepathy","random","income","cramp","today","confide","tug","rival","cloudburst","bushel","realm","infection","knowledge","hypothermia","promise","cutlass","acre","password","cashier","neutron","standing ovation","acoustics","community","lichen","ray","cartography","statement","companion","expired","zip code","default","altitude","figment","remain","gondola","reaction","sophomore","pen pal","century","transpose","quarantine","archaeologist","property","infect","apparatus","ornithologist","positive","chord","Atlantis","digestion","mine car","gallop","buccaneer","try","rest stop","insurance","publisher","tournament","opinion","tribe","organization","index","Zen","intern","czar","reimbursement","offstage","layover","protestant","first mate","panic","upgrade","stowaway","navigate","detail","hearse","cause","writhe","quiver","pastry"
    ],
    "Vietnamese": vietnamese_words,
    "Animals": [
        "sea turtle","wolf","lion","monkey","starfish","stingray","squirrel","camel","hippopotamus","dolphin","rabbit","bird","alligator","cockroach","ladybug","cheetah","platypus","pelican","otter","swan","bat","leopard","deer","skunk","crab","beaver","seagull","snake","chameleon","sheep","rhinoceros","goat","reindeer","mosquito","koala","pony","goose","seahorse","ostrich","llama","horse","armadillo","eagle","shark","bee","whale","giraffe","hyena","caterpillar","mole","zebra","sloth","fly","dragonfly","hummingbird","kangaroo","butterfly","panda","cricket","snail","donkey","frog","rooster","iguana","ox","elephant","pig","penguin","walrus","ant","lobster","hamster","inchworm","tiger","jellyfish","lemur","parrot","rat","crocodile","gorilla","duck","poodle","spider","fox","grasshopper","raccoon","owl","octopus","flamingo","anteater","seal","moose","porcupine","yak","chicken","cat","cow","turtle","polar bear","mouse","dog","bear",
        "turtle","duck","fly","sloth","cat","sea turtle","moose","ox","mouse","alligator","reindeer","pelican","butterfly","lobster","panda","hamster","dog","shark","bee","dolphin","leopard","ladybug","goose","seahorse","kangaroo","frog","deer","hyena","sheep","rabbit","starfish","llama","porcupine","chicken","chameleon","crocodile","horse","eagle","owl","platypus","crab","swan","zebra","penguin","mosquito","tiger","fox","hummingbird","gorilla","camel","armadillo","spider","cow","donkey","cricket","goat","squirrel","raccoon","seal","rhinoceros","whale","yak","ant","cheetah","caterpillar","cockroach","grasshopper","walrus","pig","parrot","bird","poodle","skunk","beaver","rooster","lemur","ostrich","koala","hippopotamus","elephant","lion","jellyfish","polar bear","snail","pony","giraffe","stingray","seagull","bat","bear","anteater","flamingo","mole","wolf","dragonfly","inchworm","monkey","otter","iguana","rat","snake","octopus",
        "shark","polar bear","sloth","grasshopper","llama","dolphin","lion","wolf","eagle","anteater","alligator","ladybug","leopard","ostrich","snake","yak","giraffe","sea turtle","penguin","hamster","tiger","hyena","mosquito","caterpillar","otter","ant","pelican","moose","poodle","gorilla","reindeer","zebra","rooster","sheep","platypus","butterfly","parrot","whale","crab","horse","octopus","cow","monkey","chicken","lemur","dragonfly","turtle","bear","donkey","bee","dog","seal","cockroach","armadillo","camel","spider","stingray","beaver","rat","elephant","snail","crocodile","bat","koala","goat","mole","jellyfish","seagull","hummingbird","frog","fly","squirrel","ox","chameleon","kangaroo","starfish","fox","cricket","hippopotamus","bird","swan","cat","skunk","goose","inchworm","pony","rhinoceros","owl","iguana","deer","raccoon","panda","duck","seahorse","flamingo","cheetah","lobster","pig","rabbit","porcupine","walrus","mouse"
    ],
}