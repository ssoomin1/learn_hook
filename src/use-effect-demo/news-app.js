import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'


const NewsList=({articles})=>{
    return(<ul>
        {
            articles.map((article, idx) => {
                return (<li key={idx}>
                    <NewsList article={article} />
                </li>)
            })
        }
    </ul>)
}

//함수형 컴포넌트
const Search=({label,handleSearch})=>{
    //keyword는 검색어
    const [keyword,setKeyword]=useState('')

    useState('')
    return(
        <div>
            <input
                type="text"
                value={keyword}
                onChange={(e)=>{
                    setKeyword(e.target.value)
                }}
            />
            <button onClick={()=>{
                //Search=(props)일때
                //props.handleSearch(keyword)
                //비구조할당
                const k=keyword.trim()
                if(k.length===0){
                    alert('검색어를 정확히 입력해주세요')
                }else{
                    handleSearch(k)
                }
                //label값이 없으면 검색이라고 해줘라.
            }}>{label??"검색"}</button>
        </div>
    )
}

const NewsItem = (props) => {
    const {title, description, url, urlToImage} = props.article

    return (
        <div>
            <h1><a href={url} target='_blank'>{title}</a></h1>
            <img style={{height: '100px'}} src={urlToImage}/>
            <p>{description}</p>
        </div>
    )
}


const NewsApp=()=>{
    const[query,setQuery]=useState(null) //검색어가 없는 것. 값이 존재하지않는다는 것을 알려줌
    const[articles,setArticles]=useState([])
    const apiKey='8769a3cc8a9c47b2b599026fd9606f88'
    //네트워크 처리를 할 때에는
    useEffect(()=>{
        if(query){
            // 초기에 한 번만 API를 통해서 뉴스 데이터 읽어오기
            fetch(`http://newsapi.org/v2/everything?apiKey=${apiKey}&q=${query}`)
                .then(res => res.json())
                .then(data => {
                    // 데이터 설정 및 로딩 상태 갱신
                    setArticles(data.articles)
                })
        }

    },[query])
    return(
        <div>
            <Search label="찾기" handleSearch={setQuery}/>
            <h1>{query}</h1>
            {/*<pre>*/}
            {/*    {JSON.stringify(articles,null,3)}*/}
            {/*</pre>*/}
            <ul>
                {
                    articles.map((article, idx) => {
                        return (<li key={idx}>
                            <NewsList article={article} />
                        </li>)
                    })
                }
            </ul>
        </div>
    )
}
ReactDOM.render(<NewsApp />, document.getElementById("root"))