import React from "react";
import './style_statistics.css'


class Statistics extends React.Component {
  render() {
    return (
      <div className="top_table">
      <table>
        <thead>
          <tr>
            <th>Работа за день</th>
            <th>Звонки</th>
            <th>Письма</th>
            <th>ТЗ</th>
            <th>Выработка</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Субботина Кристина</th>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0,00%</td>
          </tr>
          <tr>
            <th>Дорофеева Алия</th>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
          </tr>
          <tr>
            <th>Моисеева Карина</th>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
          </tr>
          <tr>
            <th>Шарапова Инга</th>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
          </tr>
          <tr>
            <th>Доронин Гордей</th>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
          </tr>
        </tbody>
      </table>
    </div>
    );
  }
}

export default Statistics;