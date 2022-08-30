// will take the bidsArr and asksArr after they are sorted. These are the queues

function LadderViewDisplay(props){
    const askArr = props.asksArr.slice(0,20);
    const bidsArr = props.bidsArr.slice(0,20);

    const askRows = askArr.map((ask, index) => {
        const price = ask[0];
        const size = ask[1];
    return(
        <tr key={index.toString()}>
            <td>{size}</td>
            <td>{price}</td>
        </tr>
    )
    }) 
// need to reverse the order of askrows and figure out why it is increasing in size

    return (
        <table id="ladderview">
            <thead>
            <tr>
                <th>
                    Market Size
                </th>
                <th>
                    Price (USD)
                </th>
            </tr>
        </thead>
        <tbody>
            {askRows.reverse()}
        </tbody>
        </table>
    )
}

export default LadderViewDisplay;