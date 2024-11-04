
const PageNums = ({ pageNums, setPage, totalPage }) => {
    return <div style={{ textAlign: "center" }}>
        {pageNums.length
            ? <>
                {pageNums[0] != 0
                    ? <button onClick={() => setPage(pageNums[0])}>이전</button>
                    : null}
                {pageNums.map(num => <button onClick={() => setPage(num + 1)} key={num}>{num + 1}</button>)}
                {pageNums[pageNums.length - 1] + 1 == totalPage
                    ? null
                    : <button onClick={() => setPage(pageNums[pageNums.length - 1] + 2)}>다음</button>}
            </>
            : null
        }
    </div>
}

export default PageNums