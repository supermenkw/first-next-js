const Tabs = ({ items, toggle, active, right, pl }) => {

  const handleClick = (value) => {
      toggle(value)
  }

  return (
      <div className={right ? 'flex-right-wrapper' : 'flex-left-wrapper'} style={{ display: 'flex', paddingLeft: pl, minHeight: '50px'}}>
          {items && items.map((item, index) => {
              return (
                  <div key={index} className={`tab-item ${active === item?.value ? 'active' : ''}`} onClick={() => handleClick(item.value)}>
                      {item?.title}
                  </div>
              )
          })}
      </div>
  )
}

export default Tabs;