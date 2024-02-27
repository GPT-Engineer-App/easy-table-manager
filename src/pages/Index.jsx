import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button, Input } from "@chakra-ui/react";
import { FaPlus, FaTable } from "react-icons/fa";

const Index = () => {
  const [table, setTable] = useState([[""]]);

  const addTable = () => {
    setTable([[""]]);
  };

  const addRow = () => {
    setTable([...table, Array(table[0].length).fill("")]);
  };

  const addColumn = () => {
    setTable(table.map((row) => [...row, ""]));
  };

  const updateCell = (rowIndex, colIndex, value) => {
    const newTable = [...table];
    if (value.startsWith("=")) {
      const cellRef = value.slice(1).toUpperCase();
      const refColIndex = cellRef.charCodeAt(0) - 65;
      const refRowIndex = parseInt(cellRef.slice(1), 10) - 1;
      if (refRowIndex >= 0 && refColIndex >= 0 && refRowIndex < table.length && refColIndex < table[0].length) {
        value = newTable[refRowIndex][refColIndex];
      } else {
        value = "REF!";
      }
    }
    newTable[rowIndex][colIndex] = value;
    setTable(newTable);
  };

  return (
    <div>
      <Button leftIcon={<FaTable />} m={4} onClick={addTable}>
        New Table
      </Button>
      <Button leftIcon={<FaPlus />} m={4} onClick={addRow}>
        Add Row
      </Button>
      <Button leftIcon={<FaPlus />} m={4} onClick={addColumn}>
        Add Column
      </Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            {table[0].map((_, index) => (
              <Th key={index}>{String.fromCharCode(65 + index)}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {table.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <Td key={`${rowIndex}-${colIndex}`}>
                  <Input value={cell} onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)} placeholder={`${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`} />
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default Index;
