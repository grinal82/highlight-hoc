/* eslint-disable default-case */
import React, { useState } from 'react';
import './App.css';

// Компоненты New и Popular для обертки
function New(props) {
    return (
        <div className="wrap-item wrap-item-new">
            <span className="label">New!</span>
            {props.children}
        </div>
    )
};

function Popular(props) {
    return (
        <div className="wrap-item wrap-item-popular">
            <span className="label">Popular!</span>
            {props.children}
        </div>
    )
};

// HOC withClassification для определения, какой компонент обернуть в зависимости от просмотров
const withClassification = (WrappedComponent) => {
  // Создаем обертывающий компонент
  function WithClassification (props){
    console.log(props.views)
    const { views } = props;

    let WrappedWithLabel;
    // Определяем, обернуть ли в Popular или New в зависимости от количества просмотров
    if(views>= 1000) {
      WrappedWithLabel = Popular;
    } else{
      WrappedWithLabel = New;
    }
  // Возвращаем обернутый компонент
  return <>
          <WrappedWithLabel>
            <WrappedComponent {...props}/>
          </WrappedWithLabel>
        </>
  }
  // Возвращаем созданный компонент
  return WithClassification;
}

// Создаем компоненты ClassifiedArticle и ClassifiedVideo, обернутые в withClassification
const ClassifiedArticle = withClassification(Article)
const ClassifiedVideo = withClassification(Video)

function Article(props) {
    return (
        <div className="item item-article">
            <h3><a href="#">{props.title}</a></h3>
            <p className="views">Прочтений: {props.views}</p>
        </div>
    )
};

function Video(props) {
    return (
        <div className="item item-video">
            <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <p className="views">Просмотров: {props.views}</p>
        </div>
    )
};

function List(props) {
    return props.list.map(item => {
        switch (item.type) {
            case 'video':
                return (
                    // Используем обернутый ClassifiedVideo компонент
                    <ClassifiedVideo {...item} />
                );

            case 'article':
                return (
                    // Используем обернутый ClassifiedArticle компонент
                    <ClassifiedArticle {...item} />
                );
        }
    });
};

export default function App() {
    const [list, setList] = useState([
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            views: 50
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            views: 12
        },
        {
            type: 'article',
            title: 'Невероятные события в неизвестном поселке...',
            views: 175
        },
        {
            type: 'article',
            title: 'Секретные данные были раскрыты!',
            views: 1532
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            views: 4253
        },
        {
            type: 'article',
            title: 'Кот Бегемот обладает невероятной...',
            views: 12,
        },
    ]);

    return (
        <List list={list} />
    );
}
