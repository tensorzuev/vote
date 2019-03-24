import * as React from 'react';
import {Simple} from '../Slides/Simple';
import {Voting} from '../Slides/Voting';
import {First} from '../Slides/First';
import {JustPic} from '../Slides/JustPic';
import {Empty} from '../Slides/Empty';

let pres:ISlides<IOneSlide> = {
  '1': {
    control: First,
    props: {
      title: 'Как ускорить идеальный код?',
      logo: '/resources/logo.png',
      description: (<div className='accent-block'>Когда микро становится макро</div>),
      author: 'Зуев Дмитрий',
      company: 'Компания Тензор'
    },
    next: 'goto'
  },
  'goto': {
    control: Simple,
    props: {
      title: 'Мы подготовили кое-что особенное',
      description: (<div className="height-100 width-100">
        <img src='/resources/qr-code.gif' className="img-with-text"/> 
        <p className="bottom-abs-text">https://zuev-vote.herokuapp.com</p>
      </div>)
    },
    next: '2'
  },
  '2': {
    control: JustPic,
    props: {
      title: 'О компании',
      description: (<img src='/resources/about.jpg' className="width-100"/>)
    },
    next: 'worksheme'
  },
  'worksheme': {
    control: Simple,
    props: {
      title: 'Мы максимально переиспользуем код',
      description: (<img src='/resources/tree.jpg' className="img-with-text"/>)
    },
    next: 'platformcode'
  },
  'platformcode': {
    control: Simple,
    props: {
      title: 'Код платформы используется везде',
      description: (<img src='/resources/every.gif' className="img-with-text"/>)
    },
    next: 'performance'
  },
  'performance': {
    control: Simple,
    props: {
      title: 'Загрузка страницы - комплекс',
      description: (<img src='/resources/question.gif' className="img-with-text"/>)
    },
    next: '3'
  },
  '3': {
    control: Empty,
    props: {
      title: 'Специфика замеров',
      description: (<div className="content-area">
            <div className='accent-block'>chrome dev tools</div>
            <div className='accent-block'>https://jsperf.com/testbyzuev1</div>
            <div className='accent-block'>https://gtmetrix.com/</div> 
        </div>)
    },
    next: 'devtools1'
  },
  'devtools1': {
    control: Voting,
    props: {
      title: 'Вы знаете о Chrome DevTools?',
      answers: [
        {ans: 'Да', next: 'devtoolsyes'},
        {ans: 'Нет', next: 'devtoolsno'}
      ]
    },
    next: null
  },
  'devtoolsyes': {
    control: Simple,
    props: {
      title: 'Большинство знает, а значит, пропустим',
      description: (<img src='/resources/devtools.png' className="img-with-text"/>)
    },
    next: 'jsperf'
  },
  'devtoolsno': {
    control: Simple,
    props: {
      title: 'Не знаете? Рили?',
      description: (<div>
        Это средства разработки от хрома.
        2-3 слайда. Как открыть.
        как запустить профилировщик.
        Как померять память.
        </div>)
    },
    next: 'jsperf'
  },
  'jsperf': {
    control: Simple,
    props: {
      title: 'jsperf.com',
      description: (<div>
          <img src='/resources/mesure.gif' height='500px'/>
        </div>)
    },
    next: 'jsperfvote'
  },
  'jsperfvote': {
    control: Voting,
    props: {
      title: 'Какой вариант эффективнее?',
      description: '',
      answers: [
        {ans: 'first', next: 'jsperfvoteresno', description: (<div>
            <img src='/resources/jsperf/code1.png' /> <br /> <br />
          </div>)},
        {ans: 'second', next: 'jsperfvoteresyes', description: (
          <div>
            <img src='/resources/jsperf/code2.png' /> <br /> <br />
          </div>
        )}
      ]
    },
    next: null
  },
  'jsperfvoteresyes': {
    control: Simple,
    props: {
      title: 'Congratulations!',
      description: (<div>
          <img src='/resources/jsperf/result.png' />
        </div>)
    },
    next: 'gtmetrix'
  },
  'jsperfvoteresno': {
    control: Simple,
    props: {
      title: 'You are loosers :)',
      description: (<div>
          <img src='/resources/jsperf/result.png' />
        </div>)
    },
    next: 'gtmetrix'
  },
  'gtmetrix': {
    control: Simple,
    props: {
      title: 'gtmetrix.com',
      description: (<div>
          <img src='/resources/gtpromo.png' />
        </div>)
    },
    next: 'template1'
  },
  'template1': {
    control: Simple,
    props: {
      title: 'Шаблонизатор',
      description: (<div>
          <img src='/resources/buildings.gif' />
        </div>)
    },
    next: 'template2'
  },
  'template2': {
    control: Simple,
    props: {
      title: 'Шаблонизатор',
      description: (<div>
          <img src='/resources/t/thtml.png' />
        </div>)
    },
    next: 'template3'
  },
  'template3': {
    control: Simple,
    props: {
      title: 'Шаблонизатор',
      description: (<div>
          <img src='/resources/t/tjs.png' />
        </div>)
    },
    next: 'template4'
  },
  'template4': {
    control: Simple,
    props: {
      title: 'Дерево элементов',
      description: (<div>
          <img src='/resources/sheme.png' />
        </div>)
    },
    next: 'template5'
  },
  'template5': {
    control: Simple,
    props: {
      title: 'Reduce+Concat VERSUS Foreach+Push',
      description: (<div>
          Reduce - перебирает элементы и возвращает результат <br />
          Foreach - перебирает элементы и нам нужно хранить результат в замыкании
        </div>)
    },
    next: 'versus1'
  },
  'versus1': {
    control: Voting,
    props: {
      title: 'Какой вариант эффективнее?',
      description: '',
      answers: [
        {ans: 'Reduce+Concat', next: 'versus1no', description: (<div>
            <img src='/resources/jsperf/vs1_1.png' /> <br /> <br />
          </div>)},
        {ans: 'Foreach+Push', next: 'versus1yes', description: (
          <div>
            <img src='/resources/jsperf/vs1_2.png' /> <br /> <br />
          </div>
        )}
      ]
    },
    next: null
  },
  'versus1yes': {
    control: Simple,
    props: {
      title: 'Congratulations!',
      description: (<div>
          <img src='/resources/jsperf/vs1_res.png' height='600px'/>
        </div>)
    },
    next: 'gtvs1_1'
  },
  'versus1no': {
    control: Simple,
    props: {
      title: 'Failure!',
      description: (<div>
          <img src='/resources/jsperf/vs1_res.png' height='600px'/>
        </div>)
    },
    next: 'gtvs1_1'
  },
  'gtvs1_1': {
    control: Simple,
    props: {
      title: 'Reduce+Concat',
      description: (<div>
          <img src='/resources/gt/vs1_1.png'/>
        </div>)
    },
    next: 'gtvs1_2'
  },
  'gtvs1_2': {
    control: Simple,
    props: {
      title: 'Foreach+Push',
      description: (<div>
          <img src='/resources/gt/vs1_2.png'/>
        </div>)
    },
    next: 'gtvs1_3'
  },
  'gtvs1_3': {
    control: Simple,
    props: {
      title: 'Foreach+Push + ЭВРИСТИКА',
      description: (<div>
          <img src='/resources/gt/code1_3.png'/>
        </div>)
    },
    next: 'gtvs1_4'
  },
  'gtvs1_4': {
    control: Simple,
    props: {
      title: 'Foreach+Push + ЭВРИСТИКА',
      description: (<div>
          <img src='/resources/gt/vs1_3.png'/>
        </div>)
    },
    next: 'gotit'
  },
  'gotit': {
    control: Simple,
    props: {
      title: ':)',
      description: (<div>
          <img src='/resources/gotit.gif'/>
        </div>)
    },
    next: 'gtvs2_1'
  },
  'gtvs2_1': {
    control: Simple,
    props: {
      title: 'Reduce',
      description: (<div>
          <img src='/resources/gt/code2_1.png'/>
        </div>)
    },
    next: 'gtvs2_1_r'
  },
  'gtvs2_1_r': {
    control: Simple,
    props: {
      title: 'Reduce',
      description: (<div>
          <img src='/resources/gt/vs2_1.png'/>
        </div>)
    },
    next: 'gtvs2_2'
  },
  'gtvs2_2': {
    control: Simple,
    props: {
      title: 'Foreach',
      description: (<div>
          <img src='/resources/gt/code2_2.png'/>
        </div>)
    },
    next: 'gtvs2_2_r'
  },
  'gtvs2_2_r': {
    control: Simple,
    props: {
      title: 'Foreach',
      description: (<div>
          <img src='/resources/gt/vs2_2.png'/>
        </div>)
    },
    next: 'regexp'
  },
  'regexp': {
    control: Simple,
    props: {
      title: 'RegExp VERSUS indexOf',
      description: (<div>
          <img src='/resources/regexppic.png' height='500px'/>
        </div>)
    },
    next: 'versus3'
  },
  'versus3': {
    control: Voting,
    props: {
      title: 'Какой вариант эффективнее?',
      description: '',
      answers: [
        {ans: 'RegExp', next: 'regexpresult', description: (<div>
            <img src='/resources/regexp/regcode.png' /> <br /> <br />
          </div>)},
        {ans: 'IndexOf', next: 'regexpresultyes', description: (
          <div>
            <img src='/resources/regexp/indexofcode.png' /> <br /> <br />
          </div>
        )}
      ]
    },
    next: null
  },
  'regexpresult': {
    control: Simple,
    props: {
      title: 'Это же было просто?!',
      description: (<div>
          <img src='/resources/regexp/res.png'/>
        </div>)
    },
    next: 'regexprchrom'
  },
  'regexpresultyes': {
    control: Simple,
    props: {
      title: 'Easy!',
      description: (<div>
          <img src='/resources/regexp/res.png'/>
        </div>)
    },
    next: 'regexprchrom'
  },
  'regexprchrom': {
    control: Simple,
    props: {
      title: 'Chrome DevTools - RegExp',
      description: (<div>
          <img src='/resources/regexp/regch.png'/>
        </div>)
    },
    next: 'regexprchrom2'
  },
  'regexprchrom2': {
    control: Simple,
    props: {
      title: 'Chrome DevTools - IndexOf',
      description: (<div>
          <img src='/resources/regexp/indexofch.png'/>
        </div>)
    },
    next: 'mem'
  },
  'mem': {
    control: Simple,
    props: {
      title: 'Relax',
      description: (<div>
          <img src='/resources/model.gif'/>
        </div>)
    },
    next: 'gtmetreg'
  },
  'gtmetreg': {
    control: Simple,
    props: {
      title: 'RegExp:: GtMetrix - real time',
      description: (<div>
          <img src='/resources/regexp/reggt.png'/>
        </div>)
    },
    next: 'gtmetind'
  },
  'gtmetind': {
    control: Simple,
    props: {
      title: 'IndexOf:: GtMetrix - real time',
      description: (<div>
          <img src='/resources/regexp/indexofgt.png'/>
        </div>)
    },
    next: 'travolta'
  },
  'travolta': {
    control: Simple,
    props: {
      title: 'WTF???',
      description: (<div>
          <img src='/resources/travolta.gif'/>
        </div>)
    },
    next: 'versus4'
  },
  'versus4': {
    control: Voting,
    props: {
      title: 'Надеюсь, вам понравилось :)',
      description: '',
      answers: [
        {ans: 'Да!', next: 'end1', description: (<div>
            Вспомните все гифки и полезные картинки...
          </div>)},
        {ans: 'Ну такое...', next: 'end1', description: (
          <div>
            Я очень старался, не надо так...
          </div>
        )}
      ]
    },
    next: 'end1'
  },
  'end1': {
    control: Simple,
    props: {
      title: 'Спасибо за внимание:)',
      description: (<div>
          <img src='/resources/logo.png'/>
        </div>)
    },
    next: null
  }
};

export default pres;
