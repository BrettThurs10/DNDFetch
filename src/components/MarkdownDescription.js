/**
 * MarkdownDescription.js
 * Parses item descriptions from the 5e-srd-api into JSX.
 * Converts markdown tables into html tables.
 */

import React from 'react';

// Define table styles
const styles = {
  theadStyle: {
    backgroundColor: "#eac98c",
    color: "#230202",
    textAlign: "left",
  },
  tdStyle: {
    padding: "0 .3rem",
  },
  rowStyle: (i) => {
    return {
      backgroundColor: i % 2 == 0 ? "#efdebd" : "#eac98c"
    }
  }
}

// Convert markdown into a 2 dimensional array of strings.
function parseMarkdownTableRow(row) {
  return row
    .split("|")
    .map(t => t.replace(/^\s+|\s+$/gm, ''))
    .filter(t => t != "");
}

function MarkdownTable(props) {
  // Remove the title-body seperator
  const desc = [...props.desc].filter(row => row.replaceAll(/\||-|\s/img, "") != "");

  // Assume the first row is the title
  const titles = parseMarkdownTableRow(desc.shift());

  // parse the remaining rows
  const rows = desc.map(row => parseMarkdownTableRow(row));

  return (
    <table>
      <thead style={styles.theadStyle}>
        {titles.map((title, i) => <th key={i} style={styles.tdStyle}>{title}</th>)}
      </thead>
      <tbody>
        {rows.map((row, i) =>
          <tr key={i} style={styles.rowStyle(i)}>
            {row.map((cell, j) => <td key={j} style={styles.tdStyle}>{cell}</td>)}
          </tr>
        )}
      </tbody>
    </table>
  )
}

// Search the description for tables, put all other description rows in a <p> tag.
export function MarkdownDescription(props) {
  const newDesc = [];
  let tableBuffer = [];

  for (let row of props.desc) {
    // Assume that any rows with a "|" indicate its a table row.
    if (/\|/img.test(row)) {
      tableBuffer.push(row)
    } else {
      // Check if previous rows contained table elements.
      if (tableBuffer.length > 0) {

        // Insert the table.
        newDesc.push(<MarkdownTable desc={tableBuffer} />)
        tableBuffer = [];
      }

      // Add the row wrapped by a <p> tag.
      newDesc.push(<p>{row}</p>);
    }
  }
  // If the last line was part of the table, add it now
  if (tableBuffer.length > 0) {
    newDesc.push(<MarkdownTable desc={tableBuffer} />)
  }

  return (
    <React.Fragment>
      {newDesc.map((nd, i) => <React.Fragment key={i}>{nd}</React.Fragment>)}
    </React.Fragment>
  )
}