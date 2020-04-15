let state = false;
let play = false;
let sound = [];
let page;
let gameStart = true;
let correct = 0;
let currentSound = 0;
let errors = 0;

//burger menu
document.querySelector('.one').addEventListener('click', () => {
    document.querySelector('.menuToggle').classList.toggle('menuToggleActive');
    document.querySelector('.menuToggle').classList.contains('menuToggleActive');
    document.querySelector('.menu').classList.toggle('menuActive')
});

//play or train switcher
document.querySelector('.switch-input').addEventListener('click', () => {
    document.querySelector('.switch-label').classList.toggle('switch-label-play');
    document.querySelector('.switch-handle').classList.toggle('switch-handle-active');
});

document.querySelector('.switch').addEventListener('mousedown', () => {
    if (play) {
        document.querySelectorAll('.rotate').forEach(key => {
            key.style.zIndex = '1';
        });
        play = false;
    } else {
        document.querySelectorAll('.rotate').forEach(key => {
            key.style.zIndex = '-1';
        });
        play = true;
    }
    document.querySelectorAll('.main-card').forEach(key => {
        key.classList.toggle('green')
    });
    document.querySelectorAll('.card').forEach(key => {
        key.classList.toggle('card-cover')
    });
    document.querySelectorAll('.card-header').forEach(key => {
        key.classList.toggle('none')
    });
    document.querySelector('.btn').classList.toggle('nothing');
    document.querySelector('.menu').classList.toggle('green');
    console.log(2)

});

//rotate cards
document.querySelectorAll('.rotate').forEach(key => {
    key.addEventListener('click', () => {
        key.parentElement.classList.toggle('translate');
        state = true;
    })
});

document.querySelectorAll('.card').forEach(key => {
    key.addEventListener('mouseout', () => {
        if (state) {
            key.classList.toggle('translate');
            state = false;
        }
    })
});

//add navigation on pages
document.querySelectorAll('.header-item').forEach(key => {
    key.addEventListener('click', (e) => {
        page = e.currentTarget.innerText;
        let i = 0;
        let j;
        if (!e.currentTarget.classList.contains('active') && e.currentTarget.innerHTML !== document.querySelector('.header-item').innerHTML) {
            document.querySelector('.secondary-container').classList.remove('none');
            document.querySelector('.main-container').classList.add('none');
            document.querySelectorAll('.front').forEach(key => {
                j = count[i];
                key.style.backgroundImage = cards[page][j].image;
                i++;
            });
            i = 0;
            document.querySelectorAll('.back').forEach(key => {
                j = count[i];
                key.style.backgroundImage = cards[page][j].image;
                i++;
            });
            i = 0;
            document.querySelectorAll('.card-header-front').forEach(key => {
                j = count[i];
                key.innerHTML = cards[page][j].word;
                i++;
            });
            i = 0;
            document.querySelectorAll('.card-header-back').forEach(key => {
                j = count[i];
                key.innerHTML = cards[page][j].translation;
                i++;
            });
            i = 0;
        } else {
            if (e.currentTarget.innerHTML === document.querySelector('.header-item').innerHTML) {
                document.querySelector('.secondary-container').classList.add('none');
                document.querySelector('.main-container').classList.remove('none')
            }
        }
        document.querySelector('.active').classList.remove('active');
        e.currentTarget.classList.toggle('active');
    })
});

//add sound
document.querySelectorAll('.front').forEach(key => {
    let currentTarget;
    key.addEventListener('click', (e) => {
        if (play === false) {
            currentTarget = cards[page][e.currentTarget.getAttribute('num')].audioSRC
            document.querySelector('.sound').src = `${currentTarget}`;
            console.log(currentTarget)
        }
    })
});

//add navigation on page from main page
document.querySelectorAll('.main-card').forEach(key => {
    key.addEventListener('click', (e) => {
        page = e.currentTarget.innerText;
        console.log(page)
        let i = 0;
        let j;
        document.querySelector('.secondary-container').classList.remove('none');
        document.querySelector('.main-container').classList.add('none');
        document.querySelectorAll('.front').forEach(key => {
            j = count[i];
            key.style.backgroundImage = cards[page][j].image;
            i++;
        });
        i = 0;
        document.querySelectorAll('.back').forEach(key => {
            j = count[i];
            key.style.backgroundImage = cards[page][j].image;
            i++;
        });
        i = 0;
        document.querySelectorAll('.card-header-front').forEach(key => {
            j = count[i];
            key.innerText = cards[page][j].word;
            i++;
        });
        i = 0;
        document.querySelectorAll('.card-header-back').forEach(key => {
            j = count[i];
            key.innerText = cards[page][j].translation;
            i++;
        });
        i = 0;
        document.querySelector('.active').classList.remove('active');
        document.querySelectorAll('.header-item').forEach(key => {
            if (page === key.innerText) {
                key.classList.toggle('active');
            }
        })
    })
});

document.querySelector('.btn').addEventListener('click', () => {
    if (gameStart) {
        for (let i = 0; i < 8; i++) {
            sound.push(cards[page][count[i]].audioSRC)
            cards.sound[cards[page][count[i]].audioSRC] = count[i];
        }
        shuffle(sound);
        document.querySelector('.btn').classList.add('repeat');
        gameStart = false;
        console.log(sound);
    }
    document.querySelector('.sound').src = sound[currentSound]
})

document.querySelectorAll('.front').forEach(key => {
    let star;
    star = document.createElement('div');
    key.addEventListener('click', (e) => {
        console.log(e.currentTarget.getAttribute('num'));
        console.log(cards.sound[sound[0]]);
        if (e.currentTarget.getAttribute('num') === cards.sound[sound[currentSound]]) {
            e.currentTarget.classList.add('inactive');
            document.querySelector('.sound').src = sound[currentSound + 1];
            document.querySelector('.soundEffect').src = 'assets/audio/correct.mp3';
            star.classList.add('star-success');
            document.querySelector('.rating').appendChild(star);
            currentSound++;
            correct++;
            if(correct===8) {
                goBackToMain();
            }
        } else {
            document.querySelector('.soundEffect').src = 'assets/audio/error.mp3'
            star.classList.add('star-error');
            document.querySelector('.rating').appendChild(star);
            errors++;
        }
    })
});

function goBackToMain() {
    if(errors===0) {
        document.body.classList.add('success')
        setTimeout(()=>{document.body.classList.remove('success')},3000)
    } else {
        document.body.classList.add('failure')
        setTimeout(()=>{document.body.classList.remove('failure')},3000)
    }
    document.querySelectorAll('.inactive').forEach(key=>{
        key.classList.remove('inactive');
    })
    document.querySelector('.active').classList.remove('active');
    document.querySelector('.header-item').classList.add('active');
    document.querySelector('.secondary-container').classList.add('none');
    document.querySelector('.main-container').classList.remove('none');
    document.querySelector('.btn').classList.remove('repeat');
    document.querySelectorAll('.star-success').forEach(key=>{
        key.remove();
    });
    document.querySelectorAll('.star-error').forEach(key=>{
        key.remove();
    });
    sound = [];
    gameStart = true;
    correct = 0;
    currentSound = 0;
    errors = 0;
}

function shuffle(squareNumberay) {
    let currentIndex = squareNumberay.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = squareNumberay[currentIndex];
        squareNumberay[currentIndex] = squareNumberay[randomIndex];
        squareNumberay[randomIndex] = temporaryValue;
    }

    return squareNumberay;
}

const count = ['first', 'second', 'third', 'fourth', 'fifes', 'six', 'sevens', 'eighth'];

const cards = {
    sound: {},

    'Action (set A)': {
        first: {
            word: 'cry',
            translation: 'плакать',
            image: 'url("assets/img/cry.jpg")',
            audioSRC: 'assets/audio/cry.mp3',
        },
        second: {
            word: 'dance',
            translation: 'танцевац',
            image: 'url("assets/img/dance.jpg")',
            audioSRC: 'assets/audio/dance.mp3',
        },
        third: {
            word: 'dive',
            translation: 'нырять',
            image: 'url("assets/img/dive.jpg")',
            audioSRC: 'assets/audio/dive.mp3',
        },
        fourth: {
            word: 'draw',
            translation: 'рисовать',
            image: 'url("assets/img/draw.jpg")',
            audioSRC: 'assets/audio/draw.mp3',
        },
        fifes: {
            word: 'fish',
            translation: 'ловить рыбу',
            image: 'url("assets/img/fish.jpg")',
            audioSRC: 'assets/audio/fish.mp3',
        },
        six: {
            word: 'fly',
            translation: 'летать',
            image: 'url("assets/img/fly.jpg")',
            audioSRC: 'assets/audio/fly.mp3',
        },
        sevens: {
            word: 'hug',
            translation: 'обнимать',
            image: 'url("assets/img/hug.jpg")',
            audioSRC: 'assets/audio/hug.mp3',
        },
        eighth: {
            word: 'jump',
            translation: 'прыгать',
            image: 'url("assets/img/jump.jpg")',
            audioSRC: 'assets/audio/jump.mp3',
        },
    },

    'Action (set B)': {
        first: {
            word: 'open',
            translation: 'открывать',
            image: 'url("assets/img/open.jpg")',
            audioSRC: 'assets/audio/open.mp3',
        },
        second: {
            word: 'play',
            translation: 'играть',
            image: 'url("assets/img/play.jpg")',
            audioSRC: 'assets/audio/play.mp3',
        },
        third: {
            word: 'point',
            translation: 'указывать',
            image: 'url("assets/img/point.jpg")',
            audioSRC: 'assets/audio/point.mp3',
        },
        fourth: {
            word: 'ride',
            translation: 'ездить',
            image: 'url("assets/img/ride.jpg")',
            audioSRC: 'assets/audio/ride.mp3',
        },
        fifes: {
            word: 'run',
            translation: 'бегать',
            image: 'url("assets/img/run.jpg")',
            audioSRC: 'assets/audio/run.mp3',
        },
        six: {
            word: 'sing',
            translation: 'петь',
            image: 'url("assets/img/sing.jpg")',
            audioSRC: 'assets/audio/sing.mp3',
        },
        sevens: {
            word: 'skip',
            translation: 'пропускать, прыгать',
            image: 'url("assets/img/skip.jpg")',
            audioSRC: 'assets/audio/skip.mp3',
        },
        eighth: {
            word: 'swim',
            translation: 'плавать',
            image: 'url("assets/img/swim.jpg")',
            audioSRC: 'assets/audio/swim.mp3',
        },
    },

    'Action (set C)': {
        first: {
            word: 'argue',
            translation: 'спорить',
            image: 'url("assets/img/argue.jpg")',
            audioSRC: 'assets/audio/argue.mp3',
        },
        second: {
            word: 'build',
            translation: 'строить',
            image: 'url("assets/img/build.jpg")',
            audioSRC: 'assets/audio/build.mp3',
        },
        third: {
            word: 'carry',
            translation: 'нести',
            image: 'url("assets/img/carry.jpg")',
            audioSRC: 'assets/audio/carry.mp3',
        },
        fourth: {
            word: 'catch',
            translation: 'ловить',
            image: 'url("assets/img/catch.jpg")',
            audioSRC: 'assets/audio/catch.mp3',
        },
        fifes: {
            word: 'drive',
            translation: 'водить машину',
            image: 'url("assets/img/drive.jpg")',
            audioSRC: 'assets/audio/drive.mp3',
        },
        six: {
            word: 'drop',
            translation: 'падать',
            image: 'url("assets/img/drop.jpg")',
            audioSRC: 'assets/audio/drop.mp3',
        },
        sevens: {
            word: 'pull',
            translation: 'тянуть',
            image: 'url("assets/img/pull.jpg")',
            audioSRC: 'assets/audio/pull.mp3',
        },
        eighth: {
            word: 'push',
            translation: 'толкать',
            image: 'url("assets/img/push.jpg")',
            audioSRC: 'assets/audio/push.mp3',
        },
    },

    'Adjective': {
        first: {
            word: 'big',
            translation: 'большой',
            image: 'url("assets/img/big.jpg")',
            audioSRC: 'assets/audio/big.mp3',
        },
        second: {
            word: 'small',
            translation: 'маленький',
            image: 'url("assets/img/small.jpg")',
            audioSRC: 'assets/audio/small.mp3',
        },
        third: {
            word: 'fast',
            translation: 'быстрый',
            image: 'url("assets/img/fast.jpg")',
            audioSRC: 'assets/audio/fast.mp3',
        },
        fourth: {
            word: 'slow',
            translation: 'медленный',
            image: 'url("assets/img/slow.jpg")',
            audioSRC: 'assets/audio/slow.mp3',
        },
        fifes: {
            word: 'friendly',
            translation: 'дружелюбный',
            image: 'url("assets/img/friendly.jpg")',
            audioSRC: 'assets/audio/friendly.mp3',
        },
        six: {
            word: 'unfriendly',
            translation: 'недружелюбный',
            image: 'url("assets/img/unfriendly.jpg")',
            audioSRC: 'assets/audio/unfriendly.mp3',
        },
        sevens: {
            word: 'young',
            translation: 'молодой',
            image: 'url("assets/img/young.jpg")',
            audioSRC: 'assets/audio/young.mp3',
        },
        eighth: {
            word: 'old',
            translation: 'старый',
            image: 'url("assets/img/old.jpg")',
            audioSRC: 'assets/audio/old.mp3',
        },
    },

    'Animal (set A)': {
        first: {
            word: 'cat',
            translation: 'кот',
            image: 'url("assets/img/cat.jpg")',
            audioSRC: 'assets/audio/cat.mp3',
        },
        second: {
            word: 'chick',
            translation: 'цыплёнок',
            image: 'url("assets/img/chick.jpg")',
            audioSRC: 'assets/audio/chick.mp3',
        },
        third: {
            word: 'chicken',
            translation: 'курица',
            image: 'url("assets/img/chicken.jpg")',
            audioSRC: 'assets/audio/chicken.mp3',
        },
        fourth: {
            word: 'dog',
            translation: 'собака',
            image: 'url("assets/img/dog.jpg")',
            audioSRC: 'assets/audio/dog.mp3',
        },
        fifes: {
            word: 'horse',
            translation: 'лошадь',
            image: 'url("assets/img/horse.jpg")',
            audioSRC: 'assets/audio/horse.mp3',
        },
        six: {
            word: 'pig',
            translation: 'свинья',
            image: 'url("assets/img/pig.jpg")',
            audioSRC: 'assets/audio/pig.mp3',
        },
        sevens: {
            word: 'rabbit',
            translation: 'кролик',
            image: 'url("assets/img/rabbit.jpg")',
            audioSRC: 'assets/audio/rabbit.mp3',
        },
        eighth: {
            word: 'sheep',
            translation: 'овца',
            image: 'url("assets/img/sheep.jpg")',
            audioSRC: 'assets/audio/sheep.mp3',
        },
    },

    'Animal (set B)': {
        first: {
            word: 'bird',
            translation: 'птица',
            image: 'url("assets/img/bird.jpg")',
            audioSRC: 'assets/audio/bird.mp3',
        },
        second: {
            word: 'fish',
            translation: 'рыба',
            image: 'url("assets/img/fish1.jpg")',
            audioSRC: 'assets/audio/fish1.mp3',
        },
        third: {
            word: 'frog',
            translation: 'лягушка',
            image: 'url("assets/img/frog.jpg")',
            audioSRC: 'assets/audio/frog.mp3',
        },
        fourth: {
            word: 'giraffe',
            translation: 'жираф',
            image: 'url("assets/img/giraffe.jpg")',
            audioSRC: 'assets/audio/giraffe.mp3',
        },
        fifes: {
            word: 'lion',
            translation: 'лев',
            image: 'url("assets/img/lion.jpg")',
            audioSRC: 'assets/audio/lion.mp3',
        },
        six: {
            word: 'mouse',
            translation: 'мышь',
            image: 'url("assets/img/mouse.jpg")',
            audioSRC: 'assets/audio/mouse.mp3',
        },
        sevens: {
            word: 'turtle',
            translation: 'черепаха',
            image: 'url("assets/img/turtle.jpg")',
            audioSRC: 'assets/audio/turtle.mp3',
        },
        eighth: {
            word: 'dolphin',
            translation: 'дельфин',
            image: 'url("assets/img/dolphin.jpg")',
            audioSRC: 'assets/audio/dolphin.mp3',
        },
    },

    'Clothes': {
        first: {
            word: 'skirt',
            translation: 'юбка',
            image: 'url("assets/img/skirt.jpg")',
            audioSRC: 'assets/audio/skirt.mp3',
        },
        second: {
            word: 'pants',
            translation: 'брюки',
            image: 'url("assets/img/pants.jpg")',
            audioSRC: 'assets/audio/pants.mp3',
        },
        third: {
            word: 'blouse',
            translation: 'блузка',
            image: 'url("assets/img/blouse.jpg")',
            audioSRC: 'assets/audio/blouse.mp3',
        },
        fourth: {
            word: 'dress',
            translation: 'платье',
            image: 'url("assets/img/dress.jpg")',
            audioSRC: 'assets/audio/dress.mp3',
        },
        fifes: {
            word: 'boot',
            translation: 'ботинки',
            image: 'url("assets/img/boot.jpg")',
            audioSRC: 'assets/audio/boot.mp3',
        },
        six: {
            word: 'shirt',
            translation: 'рубашка',
            image: 'url("assets/img/shirt.jpg")',
            audioSRC: 'assets/audio/shirt.mp3',
        },
        sevens: {
            word: 'coat',
            translation: 'пальто',
            image: 'url("assets/img/coat.jpg")',
            audioSRC: 'assets/audio/coat.mp3',
        },
        eighth: {
            word: 'shoe',
            translation: 'туфли',
            image: 'url("assets/img/shoe.jpg")',
            audioSRC: 'assets/audio/shoe.mp3',
        },
    },

    'Emotions': {
        first: {
            word: 'sad',
            translation: 'грустный',
            image: 'url("assets/img/sad.jpg")',
            audioSRC: 'assets/audio/sad.mp3',
        },
        second: {
            word: 'angry',
            translation: 'сердитый',
            image: 'url("assets/img/angry.jpg")',
            audioSRC: 'assets/audio/angry.mp3',
        },
        third: {
            word: 'happy',
            translation: 'счастливый',
            image: 'url("assets/img/happy.jpg")',
            audioSRC: 'assets/audio/happy.mp3',
        },
        fourth: {
            word: 'tired',
            translation: 'уставший',
            image: 'url("assets/img/tired.jpg")',
            audioSRC: 'assets/audio/tired.mp3',
        },
        fifes: {
            word: 'surprised',
            translation: 'удивленный',
            image: 'url("assets/img/surprised.jpg")',
            audioSRC: 'assets/audio/surprised.mp3',
        },
        six: {
            word: 'scared',
            translation: 'испуганный',
            image: 'url("assets/img/scared.jpg")',
            audioSRC: 'assets/audio/scared.mp3',
        },
        sevens: {
            word: 'smile',
            translation: 'улыбка',
            image: 'url("assets/img/smile.jpg")',
            audioSRC: 'assets/audio/smile.mp3',
        },
        eighth: {
            word: 'laugh',
            translation: 'смех',
            image: 'url("assets/img/laugh.jpg")',
            audioSRC: 'assets/audio/laugh.mp3',
        },
    }
};

/*const cards = [
    ['Action (set A)', 'Action (set B)', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotions'],
    [
        {
            word: 'cry',
            translation: 'плакать',
            image: 'img/cry.jpg',
            audioSrc: 'audio/cry.mp3'
        },
        {
            word: 'dance',
            translation: 'танцевать',
            image: 'img/dance.jpg',
            audioSrc: 'audio/dance.mp3'
        },
        {
            word: 'dive',
            translation: 'нырять',
            image: 'img/dive.jpg',
            audioSrc: 'audio/dive.mp3'
        },
        {
            word: 'draw',
            translation: 'рисовать',
            image: 'img/draw.jpg',
            audioSrc: 'audio/draw.mp3'
        },
        {
            word: 'fish',
            translation: 'ловить рыбу',
            image: 'img/fish.jpg',
            audioSrc: 'audio/fish.mp3'
        },
        {
            word: 'fly',
            translation: 'летать',
            image: 'img/fly.jpg',
            audioSrc: 'audio/fly.mp3'
        },
        {
            word: 'hug',
            translation: 'обнимать',
            image: 'img/hug.jpg',
            audioSrc: 'audio/hug.mp3'
        },
        {
            word: 'jump',
            translation: 'прыгать',
            image: 'img/jump.jpg',
            audioSrc: 'audio/jump.mp3'
        }
    ],
    [
        {
            word: 'open',
            translation: 'открывать',
            image: 'img/open.jpg',
            audioSrc: 'audio/open.mp3'
        },
        {
            word: 'play',
            translation: 'играть',
            image: 'img/play.jpg',
            audioSrc: 'audio/play.mp3'
        },
        {
            word: 'point',
            translation: 'указывать',
            image: 'img/point.jpg',
            audioSrc: 'audio/point.mp3'
        },
        {
            word: 'ride',
            translation: 'ездить',
            image: 'img/ride.jpg',
            audioSrc: 'audio/ride.mp3'
        },
        {
            word: 'run',
            translation: 'бегать',
            image: 'img/run.jpg',
            audioSrc: 'audio/run.mp3'
        },
        {
            word: 'sing',
            translation: 'петь',
            image: 'img/sing.jpg',
            audioSrc: 'audio/sing.mp3'
        },
        {
            word: 'skip',
            translation: 'пропускать, прыгать',
            image: 'img/skip.jpg',
            audioSrc: 'audio/skip.mp3'
        },
        {
            word: 'swim',
            translation: 'плавать',
            image: 'img/swim.jpg',
            audioSrc: 'audio/swim.mp3'
        }
    ],
    [
        {
            word: 'cat',
            translation: 'кот',
            image: 'img/cat.jpg',
            audioSrc: 'audio/cat.mp3'
        },
        {
            word: 'chick',
            translation: 'цыплёнок',
            image: 'img/chick.jpg',
            audioSrc: 'audio/chick.mp3'
        },
        {
            word: 'chicken',
            translation: 'курица',
            image: 'img/chicken.jpg',
            audioSrc: 'audio/chicken.mp3'
        },
        {
            word: 'dog',
            translation: 'собака',
            image: 'img/dog.jpg',
            audioSrc: 'audio/dog.mp3'
        },
        {
            word: 'horse',
            translation: 'лошадь',
            image: 'img/horse.jpg',
            audioSrc: 'audio/horse.mp3'
        },
        {
            word: 'pig',
            translation: 'свинья',
            image: 'img/pig.jpg',
            audioSrc: 'audio/pig.mp3'
        },
        {
            word: 'rabbit',
            translation: 'кролик',
            image: 'img/rabbit.jpg',
            audioSrc: 'audio/rabbit.mp3'
        },
        {
            word: 'sheep',
            translation: 'овца',
            image: 'img/sheep.jpg',
            audioSrc: 'audio/sheep.mp3'
        }
    ],
    [
        {
            word: 'bird',
            translation: 'птица',
            image: 'img/bird.jpg',
            audioSrc: 'audio/bird.mp3'
        },
        {
            word: 'fish',
            translation: 'рыба',
            image: 'img/fish1.jpg',
            audioSrc: 'audio/fish.mp3'
        },
        {
            word: 'frog',
            translation: 'жаба',
            image: 'img/frog.jpg',
            audioSrc: 'audio/frog.mp3'
        },
        {
            word: 'giraffe',
            translation: 'жирафа',
            image: 'img/giraffe.jpg',
            audioSrc: 'audio/giraffe.mp3'
        },
        {
            word: 'lion',
            translation: 'лев',
            image: 'img/lion.jpg',
            audioSrc: 'audio/lion.mp3'
        },
        {
            word: 'mouse',
            translation: 'мышь',
            image: 'img/mouse.jpg',
            audioSrc: 'audio/mouse.mp3'
        },
        {
            word: 'turtle',
            translation: 'черепаха',
            image: 'img/turtle.jpg',
            audioSrc: 'audio/turtle.mp3'
        },
        {
            word: 'dolphin',
            translation: 'дельфин',
            image: 'img/dolphin.jpg',
            audioSrc: 'audio/dolphin.mp3'
        }
    ],
    [
        {
            word: 'skirt',
            translation: 'юбка',
            image: 'img/skirt.jpg',
            audioSrc: 'audio/skirt.mp3'
        },
        {
            word: 'pants',
            translation: 'брюки',
            image: 'img/pants.jpg',
            audioSrc: 'audio/pants.mp3'
        },
        {
            word: 'blouse',
            translation: 'блузка',
            image: 'img/blouse.jpg',
            audioSrc: 'audio/blouse.mp3'
        },
        {
            word: 'dress',
            translation: 'платье',
            image: 'img/dress.jpg',
            audioSrc: 'audio/dress.mp3'
        },
        {
            word: 'boot',
            translation: 'ботинок',
            image: 'img/boot.jpg',
            audioSrc: 'audio/boot.mp3'
        },
        {
            word: 'shirt',
            translation: 'рубашка',
            image: 'img/shirt.jpg',
            audioSrc: 'audio/shirt.mp3'
        },
        {
            word: 'coat',
            translation: 'пальто',
            image: 'img/coat.jpg',
            audioSrc: 'audio/coat.mp3'
        },
        {
            word: 'shoe',
            translation: 'туфли',
            image: 'img/shoe.jpg',
            audioSrc: 'audio/shoe.mp3'
        }
    ],
    [
        {
            word: 'sad',
            translation: 'грустный',
            image: 'img/sad.jpg',
            audioSrc: 'audio/sad.mp3'
        },
        {
            word: 'angry',
            translation: 'сердитый',
            image: 'img/angry.jpg',
            audioSrc: 'audio/angry.mp3'
        },
        {
            word: 'happy',
            translation: 'счастливый',
            image: 'img/happy.jpg',
            audioSrc: 'audio/happy.mp3'
        },
        {
            word: 'tired',
            translation: 'уставший',
            image: 'img/tired.jpg',
            audioSrc: 'audio/tired.mp3'
        },
        {
            word: 'surprised',
            translation: 'удивлённый',
            image: 'img/surprised.jpg',
            audioSrc: 'audio/surprised.mp3'
        },
        {
            word: 'scared',
            translation: 'испуганный',
            image: 'img/scared.jpg',
            audioSrc: 'audio/scared.mp3'
        },
        {
            word: 'smile',
            translation: 'улыбка',
            image: 'img/smile.jpg',
            audioSrc: 'audio/smile.mp3'
        },
        {
            word: 'laugh',
            translation: 'смех',
            image: 'img/laugh.jpg',
            audioSrc: 'audio/laugh.mp3'
        }
    ]
]*/


