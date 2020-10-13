import React, { memo, Fragment } from 'react'
import XTreeStore, { path2node } from 'xtree-store'
import Table from './Table'
import { TableWrapperStyle } from './style'

function genGroupHeaderData(store) {
  const MaxRows = store.getMaxDepth()
  const rows = []

  for (let i = 0; i < MaxRows; i++) {
    rows[i] = []
    const nodes = store.getDepthNodes(i + 1) //.map(node => node.id);

    nodes.forEach(function (node) {
      const id = node.id
      const leafs = store.getAllChildren(id).filter((node) => node.leaf)
      const isLeaf = node.leaf
      let rowSpan = 1
      let colSpan = leafs.length

      if (isLeaf) {
        const pNodes = store.getParentNodes(id)
        rowSpan = MaxRows - pNodes.length
        colSpan = 1
      }

      node.rowSpan = rowSpan
      node.colSpan = colSpan

      node.dataIndex = id
      node.title = id.split('_')[i]

      rows[i].push(node)
    })
  }

  return rows
}

function fmoney(num, n) {
  var undef
  n = n === undef ? 2 : n
  num = parseFloat(num)

  if (isNaN(num)) {
    return num
  }

  num = (parseFloat(num.toFixed(n)) + '').replace(
    /\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,
    '$&,'
  )

  return num + ''
}

function RBTable({ item, sourceData }) {
  // const { item } = props;
  // const { mockData = "" } = item;
  // console.log(item.title + item.id + "更新");
  // let data = transformMockData(mockData);
  // console.log(data);
  let data = sourceData

  var dataSet = []

  for (var i = 0; i < data.list.length; i++) {
    var d = data.list[i]
    var _d = {}
    for (var t = 0; t < d.length; t++) {
      _d[data.columns[t]] = d[t]
    }
    dataSet.push(_d)
  }

  const cellMerge = item.isMergeCell

  const fixColumnCount = item.lockColumns

  const fixColumns = data.columns.slice(0, fixColumnCount)
  const columns = data.columns.slice(fixColumnCount)

  const nodes = path2node(columns, '_')

  const columnStore = XTreeStore.createStore(nodes, {
    simpleData: true
  })

  function cellRender(str) {
    if (str && !isNaN(parseFloat(str)) && isFinite(str)) {
      str = fmoney(str)
    }

    if (!/%$/gi.test(str + '')) {
      return str
    }

    var w = parseFloat(str)

    if (isNaN(w)) return str

    var rgb = 'rgba(48,191,96,0.2)'
    var color = '#008D5E'
    if (w < 0) {
      rgb = 'rgba(255,140,25,0.2)'
      color = '#E65322'
    }

    return (
      <>
        <div
          className='v-process'
          style={{
            width: Math.abs(w) + '%',
            backgroundColor: rgb
          }}
        ></div>
        <div
          className='v-process v-process-text'
          style={{
            width: '100%',
            padding: '0 6px',
            color: color
          }}
        >
          {str}
        </div>
      </>
    )
  }

  return (
    <TableWrapperStyle>
      <Table
        cellMerge={cellMerge}
        columnStore={columnStore}
        leafColumns={columnStore
          .getAllChildren()
          .filter((node) => columnStore.isLeaf(node.id))}
        fixColumns={fixColumns.map((name) => {
          return {
            title: name,
            dataIndex: name
          }
        })}
        columns={genGroupHeaderData(columnStore)}
        cellRender={cellRender}
        data={dataSet}
      />
    </TableWrapperStyle>
  )
}

export default memo(RBTable)
