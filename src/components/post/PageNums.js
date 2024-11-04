
const PageNums = ({ pageNums, setPage, totalPage }) => {
    return <div style={{ textAlign: "center" }}>
        {pageNums.length
            ? <>
                {pageNums[0] != 0
                    ? <button onClick={() => setPage(1)}>처음</button>
                    : null}
                {pageNums.map(num => <button onClick={() => setPage(num + 1)}>{num + 1}</button>)}
                {pageNums[pageNums.length - 1] + 1 == totalPage
                    ? null
                    : <button onClick={() => setPage(totalPage)}>끝</button>}
            </>
            : null
        }
    </div>
}

export default PageNums