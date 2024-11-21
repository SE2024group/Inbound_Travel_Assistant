// pages/attractionDetail/attractionDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    attractionName: '',
    imgSrcs: [],                      // Array to hold image URLs

    current: 0,                       // Initial slide index
    autoplay: true,                   // Autoplay enabled
    duration: 500,                    // Transition duration (ms)
    interval: 3000,                   // Autoplay interval (ms)
    navigation: { type: 'fraction' }, // Show navigation arrows and indicators
    swiperImageProps: {
      mode: 'aspectFill'              // Image mode for display
    },
    descriptions: {
      'Tiananmen-Square': 'Tiananmen Square, located in the center of Beijing, is one of the largest public squares in the world and holds significant cultural and historical importance in China. Originally built in 1651 and expanded in the 1950s, the square is surrounded by iconic landmarks, including the Tiananmen Gate, the Monument to the People\'s Heroes, and the Mausoleum of Mao Zedong. It has been the site of numerous important events in Chinese history and is a symbol of national pride. Every day, visitors gather to witness the flag-raising ceremony, and the square remains a popular destination for tourists from around the world who come to experience its grandeur and historical ambiance.',

      'National-Museum': 'The National Museum of China, situated on the eastern side of Tiananmen Square in Beijing, is one of the largest museums in the world and a treasure trove of Chinese history and culture. Established in 2003 through the merger of the National Museum of Chinese History and the National Museum of Chinese Revolution, it houses a vast collection of artifacts that span the entire history of China, from ancient times to the modern era. The museum’s architecture is a blend of traditional Chinese elements and modern design, reflecting its role as a bridge between the past and the present. With its extensive exhibitions and educational programs, the National Museum is a must-visit destination for those seeking to understand the rich tapestry of China’s heritage. It attracts millions of visitors annually, including locals and international tourists, who come to marvel at the exhibits and immerse themselves in the country’s storied past.',

      'Tsinghua-University': 'Tsinghua University, located in the Haidian District of Beijing, is one of the most prestigious universities in China and is renowned worldwide for its academic excellence, research contributions, and beautiful campus. Founded in 1911, Tsinghua has a long history of nurturing some of China’s most influential leaders, scholars, and innovators. The university is particularly noted for its strength in science, engineering, and technology, while also offering a comprehensive range of programs in the humanities, social sciences, and management. The campus, with its traditional Chinese architecture mixed with modern facilities, is a testament to the university’s blend of heritage and progress. Tsinghua University is a hub for international collaboration and is often ranked among the top universities globally, making it a sought-after destination for students and scholars from around the world.',

      'The-Palace-Museum': 'The Palace Museum, also known as the Forbidden City, is an imperial palace complex located in the heart of Beijing, China. It served as the home of emperors and the political center of Chinese government for nearly five centuries, from the Ming dynasty to the end of the Qing dynasty. Constructed in the 15th century, the palace is an architectural marvel, consisting of 980 buildings and covering an area of 72 hectares. It is renowned for its intricate traditional Chinese design, with red walls and golden roofs, and its historical and cultural significance is unparalleled. The Palace Museum houses an extensive collection of art, including paintings, calligraphy, ceramics, and imperial artifacts, making it one of the most important cultural heritage sites in the world. As a UNESCO World Heritage Site, it attracts millions of visitors each year who come to explore the grandeur of Chinese imperial history and the splendor of its ancient palatial life.',

      'The-Great-Wall': 'The Great Wall of China is one of the most iconic landmarks in the world, stretching over 13,000 miles from east to west across northern China. Built in several stages from the 7th century BC to the 16th century AD, the wall was originally constructed to protect Chinese states and empires against incursions by various nomadic groups of the Eurasian Steppe. The Great Wall is not a single continuous wall but a series of walls, watchtowers, and fortifications made of stone, brick, wood, and other materials. Its most famous sections, such as those near Beijing, have been extensively restored and are now major tourist attractions, drawing visitors with their stunning views and historical significance. A testament to human ingenuity and perseverance, the Great Wall is a symbol of Chinese strength and culture, and it is listed as a UNESCO World Heritage Site. Its grand scale and architectural achievements continue to inspire awe and fascination around the globe.',

      'Capital-Museum-of-Beijing':'The Capital Museum of Beijing, located in the Xicheng District of the city, is a prominent cultural institution showcasing the rich history and heritage of China’s capital. Opened to the public in 1981 and expanded in 2006 with its modern building, the museum is a stunning blend of contemporary architecture and traditional Chinese design elements. Its vast collection includes artifacts from ancient Beijing, cultural relics from the Ming and Qing dynasties, and exhibits that highlight the city\'s development through the ages. The museum also features special exhibitions that explore themes of art, history, and urban culture, making it a hub for cultural exchange and education. With state-of-the-art facilities and interactive displays, the Capital Museum offers an engaging experience for visitors of all ages. Each year, it draws both locals and tourists who come to delve into the fascinating story of Beijing and appreciate the city\'s unique place in Chinese history and culture.',

      'National-Art-Museum-of-China':'The National Art Museum of China (NAMOC), located in the Dongcheng District of Beijing, is a premier institution dedicated to the collection, research, and exhibition of Chinese art. Established in 1962, the museum\'s iconic building reflects traditional Chinese architectural styles, with its distinct pagoda-like roof and intricate design. NAMOC houses an extensive collection of over 100,000 works, including ancient Chinese paintings, modern and contemporary art, folk art, and international masterpieces. The museum showcases the evolution of Chinese artistic expression, from classical calligraphy and ink painting to avant-garde works by modern artists. In addition to its permanent exhibits, NAMOC regularly hosts special exhibitions, cultural exchanges, and educational programs, fostering dialogue between Chinese and global art communities. Renowned for its role in promoting Chinese culture, the museum is a must-visit destination for art enthusiasts and tourists alike, offering a profound insight into the artistic heritage and innovation of China.',

      'China-Science-and-Technology-Museum':'The China Science and Technology Museum, located in the Chaoyang District of Beijing, is a state-of-the-art facility dedicated to inspiring curiosity and promoting public understanding of science and technology. Opened in 1988 and expanded in 2009, the museum\'s modern architecture is both functional and visually striking, symbolizing innovation and progress. It features a vast array of exhibits covering topics such as physics, biology, astronomy, robotics, and space exploration, making it a hub for interactive learning and discovery. The museum also boasts a digital planetarium, a 4D theater, and hands-on activity zones designed to engage visitors of all ages. Regularly hosting exhibitions, workshops, and science events, the museum is a dynamic center for educational and cultural exchange. A popular destination for families, students, and science enthusiasts, the China Science and Technology Museum provides a fascinating journey into the wonders of the natural world and human ingenuity, highlighting China\'s achievements and aspirations in science and technology.',

      'Sanlitun-Taikoo-Li':'Sanlitun Taikoo Li, located in Beijing’s Chaoyang District, is a vibrant and modern commercial complex that has become a landmark for shopping, dining, and entertainment. Opened in 2008 and developed by Swire Properties, the complex is divided into two sections: Taikoo Li South, inspired by Beijing\'s traditional hutongs, and Taikoo Li North, designed with courtyard-style architecture reminiscent of siheyuan. With over 300 stores, including global brands like Apple, Uniqlo, Nike, and luxury boutiques, it offers a premium shopping experience. The area also boasts a diverse selection of restaurants, trendy bars, and The Opposite House, a boutique hotel known for its contemporary design. Sanlitun Taikoo Li’s open-air layout, pedestrian-friendly lanes, and cultural events make it a dynamic hub for locals and tourists alike. As a center for fashion, art, and nightlife, it reflects Beijing’s modern cosmopolitan spirit while maintaining a connection to its traditional heritage.',

      'Wangfujing':'Wangfujing, located in the heart of Beijing, is one of the city\'s most famous and bustling shopping streets, with a history that dates back to the Ming Dynasty. Renowned for its vibrant atmosphere and diverse offerings, Wangfujing is home to an array of modern malls, traditional Chinese stores, and international brands, making it a premier destination for both locals and tourists. The street also features a lively night market where visitors can sample Beijing\'s famous street food, from tanghulu to exotic delicacies. Landmarks such as the Wangfujing Bookstore and the historic Catholic church add cultural depth to the area. Blending traditional Chinese charm with contemporary urban appeal, Wangfujing is a microcosm of Beijing’s dynamic evolution, offering an immersive shopping, dining, and cultural experience. It remains a must-visit destination for those looking to explore the city’s commercial and historical vibrancy.',

      'China-World-Trade-Center':'The China World Trade Center, located in Beijing’s Chaoyang District, is a prominent landmark and one of the city’s most prestigious commercial complexes. Opened in 1990 and continually expanded, it features a mix of high-end office spaces, luxury hotels, shopping malls, and fine dining establishments. The centerpiece of the complex is the iconic China World Tower, one of Beijing’s tallest skyscrapers, offering breathtaking views of the city. The China World Mall, a part of the complex, houses a wide range of international luxury brands, lifestyle stores, and gourmet restaurants, catering to an affluent and cosmopolitan clientele. With its central location and direct connection to the Beijing subway, the China World Trade Center serves as a hub for business, leisure, and international events. Known for its modern architecture, state-of-the-art facilities, and dynamic atmosphere, it represents the pinnacle of Beijing’s global economic presence and contemporary urban sophistication.',

      'Solana':'Solana, located near Chaoyang Park in Beijing, is a vibrant lifestyle shopping park combining European-style architecture with modern amenities. Opened in 2008, it features nearly 500 brands, offering shopping, dining, entertainment, and leisure activities. Highlights include a lakeside dining area, an open-air design, and themed zones like a children’s city and bar street. Solana hosts cultural events and festivals year-round, making it a popular destination for locals and tourists seeking a unique and leisurely experience in the city. Its convenient location and diverse offerings make it a standout attraction in Beijing.',

      'Nanluoguxiang':'Nanluoguxiang, located in Beijing’s Dongcheng District, is a historic alleyway (hutong) renowned for its blend of traditional charm and modern flair. Dating back to the Yuan Dynasty, it is one of Beijing’s oldest neighborhoods and features well-preserved architecture with gray brick courtyards and narrow streets. Today, it is a lively hub filled with boutique shops, trendy cafes, street food vendors, and art studios, attracting both locals and tourists. Nanluoguxiang offers a unique experience that combines the nostalgia of old Beijing with a vibrant, contemporary atmosphere, making it a must-visit destination for culture and history enthusiasts.',

      'Shichahai':'Shichahai, located in the heart of Beijing, is a picturesque area of three interconnected lakes—Qianhai, Houhai, and Xihai—surrounded by historic hutongs, ancient temples, and traditional courtyards. Once a bustling hub during the Yuan Dynasty, it remains a vibrant cultural and recreational destination. Visitors can enjoy activities like boating in the summer, ice skating in the winter, and strolling along the scenic lakesides lined with cafes, bars, and shops. With its mix of natural beauty and historic charm, Shichahai offers a glimpse into old Beijing while serving as a lively spot for leisure and entertainment.',

      '798-Art-District':'The 798 Art District, located in Beijing\'s Chaoyang District, is a renowned hub for contemporary art and culture. Housed in a former industrial complex of 1950s Bauhaus-style factories, the district has been transformed into a vibrant space for galleries, studios, and cultural institutions. It showcases a diverse range of art, from avant-garde installations to modern Chinese works, and regularly hosts exhibitions, performances, and events. With its unique mix of industrial architecture and creative energy, 798 attracts art enthusiasts, tourists, and locals alike, making it a must-visit destination for experiencing Beijing’s dynamic art scene.',

      'Bell-and-Drum-Towers-Cultural-Area':'The Bell and Drum Towers, located in Beijing\'s Dongcheng District, are iconic historical landmarks that once served as the city\'s timekeeping center during the Yuan, Ming, and Qing dynasties. Positioned at the northern end of Beijing\'s central axis, the area is steeped in cultural significance and surrounded by traditional hutongs and courtyards. Visitors can climb the towers for panoramic views of old Beijing and explore exhibitions on ancient timekeeping methods. The surrounding area is a lively hub featuring local shops, teahouses, and cultural performances, offering a glimpse into Beijing’s rich history and vibrant traditions.',

      'Summer-Palace':'The Summer Palace, located in the Haidian District of Beijing, is a UNESCO World Heritage Site and a masterpiece of Chinese landscape design. Built during the Qing Dynasty, it served as a royal retreat and features a harmonious blend of natural scenery and man-made structures. Centered around Kunming Lake and Longevity Hill, the palace is adorned with pavilions, bridges, and corridors, showcasing traditional Chinese architecture and art. Key attractions include the Long Corridor, the Marble Boat, and the Tower of Buddhist Incense. A symbol of imperial grandeur, the Summer Palace remains a tranquil escape for visitors seeking to explore China’s rich cultural and historical heritage.',

      'Yuanming-Yuan':'Yuanming Yuan, also known as the Old Summer Palace, is located in the Haidian District of Beijing and was once an imperial garden of unparalleled grandeur. Constructed during the Qing Dynasty, it was celebrated for its exquisite combination of Chinese and Western architectural styles, sprawling gardens, and intricate waterways. Often referred to as the "Garden of Gardens," Yuanming Yuan symbolized the height of Chinese artistic and cultural achievement. Tragically, much of it was destroyed during the Second Opium War in 1860, leaving behind ruins that now serve as a somber reminder of history. Today, it is a historic site and park where visitors can explore its remains, tranquil landscapes, and museum exhibits, reflecting on its legacy as a pinnacle of imperial splendor.',

      'Beihai-Park':'Beihai Park, located in the center of Beijing, is one of China’s oldest and most well-preserved imperial gardens, with a history spanning over a thousand years. Built during the Liao Dynasty and expanded by successive dynasties, the park features a stunning combination of traditional Chinese landscaping, temples, and pavilions. The centerpiece is Beihai Lake, with Jade Island at its heart, crowned by the iconic White Dagoba. Visitors can enjoy boating on the lake, exploring ancient Buddhist relics, and strolling through serene gardens. As a symbol of classical Chinese garden design, Beihai Park remains a cherished destination for both leisure and cultural appreciation.',

      'Fragrant-Hills-Park':'Fragrant Hills Park, located in the western suburbs of Beijing, is a historic and scenic park known for its natural beauty and cultural significance. Established during the Jin Dynasty and expanded under the Qing Dynasty, the park features lush forests, winding paths, and ancient temples set against the backdrop of Xiangshan Mountain. Its name comes from the incense-like shape of its highest peak. Renowned for its vibrant autumn foliage, especially the red maple leaves, the park attracts countless visitors during the fall season. Key landmarks include Biyun Temple, the Fragrant Hills Pagoda, and Shuangqing Villa. Combining tranquility and history, Fragrant Hills Park offers an idyllic retreat from the city.',

      'Beijing-Botanical-Garden':'The Beijing Botanical Garden, located near Fragrant Hills in the western suburbs of Beijing, is a vast expanse dedicated to the preservation and display of diverse plant species. Established in 1956, it covers an area of over 400 hectares and features specialized gardens, greenhouses, and scenic landscapes. Highlights include the Peach Blossom Garden, the Rose Garden, and the Exotic Plant Greenhouse, which houses rare and tropical species. The garden also contains historical landmarks like the Temple of the Reclining Buddha and Cao Xueqin Memorial Hall. A haven for nature enthusiasts, the Beijing Botanical Garden offers a serene escape with its stunning flora and tranquil atmosphere.',

      'Olympic-Forest-Park':'The Olympic Forest Park, located in Beijing\'s Chaoyang District, is a sprawling urban park built for the 2008 Beijing Olympics. Covering an area of over 680 hectares, it serves as a green oasis in the city and a model of eco-friendly urban development. The park is divided into two sections: the southern section features lush landscapes and wetlands, while the northern section offers rolling hills and forests. Key attractions include Yangshan Hill, Aohai Lake, and a network of walking and cycling paths. Popular for recreation and relaxation, the park is a symbol of harmony between nature and modern urban life.'



    },

    imgSrcs:{
      'Tiananmen-Square': [
        "https://cloud.tsinghua.edu.cn/f/e0d6af7b94574b06b4ee/?dl=1",
        "https://cloud.tsinghua.edu.cn/f/806ca2b883094fd9a939/?dl=1",
        "https://cloud.tsinghua.edu.cn/f/45177ba384bb4a8d8ff6/?dl=1"
      ],
      'National-Museum': [
        "https://cloud.tsinghua.edu.cn/f/a62961022d534dce8b6c/?dl=1",
        "https://cloud.tsinghua.edu.cn/f/9fb7eaef64fc4b31b513/?dl=1",
        "https://cloud.tsinghua.edu.cn/f/74a9311eea8d468aa951/?dl=1"
      ],
      'Tsinghua-University': [
        "https://cloud.tsinghua.edu.cn/f/fde04128f5bc47399bba/?dl=1",
        "https://cloud.tsinghua.edu.cn/f/67c79d4151984f479d00/?dl=1",
        "https://cloud.tsinghua.edu.cn/f/4940c99708a54e9db099/?dl=1"
      ],
      'The-Palace-Museum': [
        "https://cloud.tsinghua.edu.cn/f/0307e4d12af94eb1b2b4/?dl=1",
        "https://cloud.tsinghua.edu.cn/f/5056579d76bc45f58732/?dl=1",
        "https://cloud.tsinghua.edu.cn/f/2647f23564c24b4f8b9a/?dl=1"
      ],
      'The-Great-Wall': [
        "https://cloud.tsinghua.edu.cn/f/17b5df923f4e4d3da0df/?dl=1",
        "https://cloud.tsinghua.edu.cn/f/3b8bd02834084915ba78/?dl=1",
        "https://cloud.tsinghua.edu.cn/f/c98f1742f64447828f3a/?dl=1"
      ],
      'Capital-Museum-of-Beijing':[
        "https://cloud.tsinghua.edu.cn/f/c53ce2da8b2c4ad7aa95/?dl=1",
        "https://cloud.tsinghua.edu.cn/f/5f86eba55335494c97a3/?dl=1",
        "https://cloud.tsinghua.edu.cn/f/e065d279962d4b379b98/?dl=1"
      ],
      'National-Art-Museum-of-China':[
        "https://cloud.tsinghua.edu.cn/f/0f97e0c1509e4d26be25/?dl=1",
        "https://cloud.tsinghua.edu.cn/f/85511ad3c25a47e3ac9a/?dl=1"
      ],
      'China-Science-and-Technology-Museum':[
        "https://cloud.tsinghua.edu.cn/f/3fff18635c4a45318ea1/?dl=1",
        "https://cloud.tsinghua.edu.cn/f/90d35459f77d4a6bb219/?dl=1",
        "https://cloud.tsinghua.edu.cn/f/2d84c80259364065af25/?dl=1"
      ],
      'Sanlitun-Taikoo-Li':[
        'https://cloud.tsinghua.edu.cn/f/f775870e00764c75a48d/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/6a3375c9bbf54585b49f/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/4fe8effb54f24bfc9ac2/?dl=1'
      ],
      'Wangfujing':[
        'https://cloud.tsinghua.edu.cn/f/ba2bb1d94fe24df0a06d/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/4176723ee37b4d90aa33/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/e4485d39a8a041af846d/?dl=1'
      ],
      'China-World-Trade-Center':[
        'https://cloud.tsinghua.edu.cn/f/adb8e24b0cdf4d5391c7/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/916072f4fc364e6f94e3/?dl=1'
      ],
      'Solana':[
        'https://cloud.tsinghua.edu.cn/f/1ae0cbc1475c4e639ac2/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/4140c95e91a34da481b2/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/d4b5b887ff8e4b53a7f4/?dl=1'
      ],
      'Nanluoguxiang':[
        'https://cloud.tsinghua.edu.cn/f/225d748808c94f57ac54/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/07f2f11397f2401eae7c/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/5afa8d3cacd14fc4aeb7/?dl=1'
      ],
      'Shichahai':[
        'https://cloud.tsinghua.edu.cn/f/363071271cf94d7aacc0/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/3adef7fd6b474791b64e/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/903ef6bfcb1f4e0bb660/?dl=1'
      ],
      '798-Art-District':[
        'https://cloud.tsinghua.edu.cn/f/c02295b3f6f441a2849a/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/9a314b5438e84030b066/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/969975b11fc2416681b2/?dl=1'
      ],
      'Bell-and-Drum-Towers-Cultural-Area':[
        'https://cloud.tsinghua.edu.cn/f/1c58bc49474f4544a89b/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/bbac29be8ae4400fbbc9/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/e6aacdef10e048fcb673/?dl=1'
      ],
      'Summer-Palace':[
        'https://cloud.tsinghua.edu.cn/f/9cf05d07ce1a487ca2bc/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/cc1369cb35eb43a98baa/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/c351ae69a40b4a1eb966/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/6207ae0b79604abfb47d/?dl=1'
      ],
      'Yuanming-Yuan':[
        'https://cloud.tsinghua.edu.cn/f/92be3bb0fba048888969/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/aee61b39904c4f9d9f59/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/3c8526dd4156412eb17f/?dl=1'
      ],
      'Beihai-Park':[
        'https://cloud.tsinghua.edu.cn/f/3027bede78cd453b8ca0/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/e042dbae0b714e5d8c55/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/390beeef55f34c59a503/?dl=1'
      ],
      'Fragrant-Hills-Park':[
        'https://cloud.tsinghua.edu.cn/f/926e86e6d2ac47e6a70a/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/ed9226003f0c4461ac05/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/2e0c47dea6ac448e8cd8/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/a712dc5398df49598c81/?dl=1'
      ],
      'Beijing-Botanical-Garden':[
        'https://cloud.tsinghua.edu.cn/f/10edf383daa14ccfb548/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/aaca705330c247d2b140/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/c3ba289b68b9491989e4/?dl=1'
      ],
      'Olympic-Forest-Park':[
        'https://cloud.tsinghua.edu.cn/f/5a62cf8ca8ab4e5c83c1/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/4c1148b2bb9945cb9b04/?dl=1',
        'https://cloud.tsinghua.edu.cn/f/26dc7420a6f74b4f938c/?dl=1'
      ]



    },

    openingHours: {
      'Tiananmen-Square':'Daily: 8:00 AM - 6:00 PM',
      'National-Museum':'Daily: 9:00 AM - 5:00 PM. Except Monday',
      'Tsinghua-University':'Daily: All day',
      'The-Palace-Museum':'Daily: 6:00 AM - 8:00 PM',
      'The-Great-Wall':'Daily: 7:00 AM - 5:00 PM',
    },
    reservationLink: {
      'Tiananmen-Square':'https://tickets.tiananmen.com',
      'National-Museum':'https://tickets.tiananmen.com',
      'Tsinghua-University':'https://tickets.tiananmen.com',
      'The-Palace-Museum':'https://tickets.tiananmen.com',
      'The-Great-Wall':'https://tickets.tiananmen.com',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const attractionName = options.name;
    const imgSrcs = this.data.imgSrcs[attractionName];
    const description = this.data.descriptions[attractionName];
    const openingHours = this.data.openingHours[attractionName];
    const reservationLink = this.data.reservationLink[attractionName];

    this.setData({
      attractionName: attractionName,
      imgSrcs: imgSrcs,
      description: description,
      openingHours: openingHours,
      reservationLink: reservationLink
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})