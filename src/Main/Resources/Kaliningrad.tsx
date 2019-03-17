import * as React from 'react';
import {Simple} from '../Slides/Simple';
import {Voting} from '../Slides/Voting';

let pres:ISlides<IOneSlide> = {
  '1': {
    control: Simple,
    props: {
      title: 'Tensor',
      description: (<div>Как ускорить идеальный код?<br/> </div>)
    },
    next: 'goto'
  },
  'goto': {
    control: Simple,
    props: {
      title: 'We have a feedback',
      description: (<div>Перейдите по ссылочке</div>)
    },
    next: '2'
  },
  '2': {
    control: Simple,
    props: {
      title: 'О компании',
      description: (<div>Чем мы занимаемся и т.п.</div>)
    },
    next: 'worksheme'
  },
  'worksheme': {
    control: Simple,
    props: {
      title: 'Схема работы',
      description: (<div>Мы переиспользуем код (картинка с деревом)</div>)
    },
    next: 'platformcode'
  },
  'platformcode': {
    control: Simple,
    props: {
      title: 'Код платформы используется везде',
      description: (<div>Выполняется постоянно!!1 Мы
        должны быть внимательны до запятой</div>)
    },
    next: 'performance'
  },
  'performance': {
    control: Simple,
    props: {
      title: 'Загрузка страницы - комплекс',
      description: (<div>Как его мерять?</div>)
    },
    next: '3'
  },
  '3': {
    control: Simple,
    props: {
      title: 'Специфика замеров',
      description: (<div>
          <ul>
            <li>chrome dev tools</li>
            <li>https://jsperf.com/testbyzuev1</li>
            <li>https://gtmetrix.com/</li>
          </ul>
        </div>)
    },
    next: 'devtools1'
  },
  'devtools1': {
    control: Voting,
    props: {
      title: 'Do you know about DevTools?',
      description: 'it\'s part of browser chrome :)',
      answers: [
        {ans: 'Yes', next: 'devtoolsyes'},
        {ans: 'No', next: 'devtoolsno'}
      ]
    },
    next: null
  },
  'devtoolsyes': {
    control: Simple,
    props: {
      title: 'Большинство знает, не будем заморачиваться',
      description: (<div>
          Панелька с кучей фич
        </div>)
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
          Штука, которая меряет производительность,
          путем запуска в течение одинакового времени
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
            screen code 1
          </div>)},
        {ans: 'second', next: 'jsperfvoteresyes', description: (
          <div>
            screen code 2
            <img src='/temp.jpg' />
          </div>
        )}
      ]
    },
    next: null
  },
  'jsperfvoteresyes': {
    control: Simple,
    props: {
      title: 'jsperf.com',
      description: (<div>
          Круто! Угадали
        </div>)
    },
    next: null
  },
  'jsperfvoteresno': {
    control: Simple,
    props: {
      title: 'jsperf.com',
      description: (<div>
          Loooosers!
        </div>)
    },
    next: null
  }
};

export default pres;
