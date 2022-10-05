import React from 'react'

const extrafile = () => {
  return (
    <div style = {{width : '100%', paddingRight : 'var(--bs-gutter-x,.75rem)', paddingLeft : 'var(--bs-gutter-x,.75rem)', marginRight : 'auto', marginLeft : 'auto'}}>
       {order.cart.totalQty === 1 ? <p style={{ font: '600 4vh italic' }}>YOU PURCHASED {order.cart.totalQty} ITEM</p> : <p style={{ font: '600 4vh italic' }}>YOU PURCHASED {order.cart.totalQty} ITEMS</p>}
                  <hr></hr>
                  {order.cart.orderItems.map(item => (
                    <div style = {{display : 'flex', alignItems : 'center', marginBottom : '1rem', flexWrap : 'wrap', marginTop : 'calc(-1 * var(--bs-gutter-y))', marginRight : 'calc(-.5 * var(--bs-gutter-x))', marginLeft : 'calc(-.5 * var(--bs-gutter-x))'}}>
                      <div style = {{flex : '1 0 0%'}}>
                        <div style = {{position: 'relative'}}>
                          <span style = {{borderRadius: '50rem!important', backgroundColor: 'rgba(var(--bs-secondary-rgb),var(--bs-bg-opacity))!important', display: 'inline-block', padding: '0.35em 0.65em', fontWeight: '700',lineHeight: '1', color: '#fff', textAlign: 'center', whiteSpace: 'nowrap', verticalAlign: 'baseline',position: 'absolute', right: '-10px', top: '-10px', fontSize: '15px', fontFamily: "'Gentium Book Plus', serif", zIndex: '2'}}>{item.quantity}</span>
                          <div style = {{alignItems: 'center', justifyContent: 'center', position: 'relative', display: 'flex'}}>
                            <div style = {{width: '100%', paddingTop: '100%', position: 'relative'}}>
                              <img style = {{verticalAlign: 'middle', maxWidth: '100%', objectFit: 'cover', position: 'absolute', top: '0', left: '0', width: '100%', height: '100%'}} src={item.image} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style = {{flex : '1 0 0%', marginLeft: '1vh', color : '#6c757d!important'}}>
                        <div style = {{display: 'flex', flexWrap: 'wrap', marginTop: 'calc(-1 * var(--bs-gutter-y))', marginRight: 'calc(-.5 * var(--bs-gutter-x))', marginLeft: 'calc(-.5 * var(--bs-gutter-x))'}}>{item.name}</div>
                      </div>
                      <div style = {{flex: '0 0 auto', width: '16.66666667%'}}></div>
                      <div style = {{flex: '0 0 auto', width: '33.33333333%'}}>
                        <div style={{ fontWeight: 'bolder', marginRight: '10px', justifyContent : 'flex-end!important', display: 'flex', flexWrap: 'wrap', marginTop: 'calc(-1 * var(--bs-gutter-y))', marginLeft: 'calc(-.5 * var(--bs-gutter-x))'}} >Rs {item.quantity * item.price}</div>
                      </div>
                    </div>
                  ))} 
    </div>
  )
}

export default extrafile