import './styles/PollsTable.css'
export const PollsTable = () => {
  return (
    <div>
        <table>
            <tr>
                <th>Number</th>
                <th>Poll Question</th>
                <th>Total Votes</th>
                <th>Tags</th>
            </tr>
            <tr>
                <td>1</td>
                <td>Will India win the ICC World Cup next time?</td>
                <td>22</td>
                <td>Sports Games</td>
            </tr>
            <tr>
                <td>2</td>
                <td>What will be the total corona casualties by the next year globally?</td>
                <td>10</td>
                <td>Health Polit</td>
            </tr>
        </table>
    </div>
  )
}
