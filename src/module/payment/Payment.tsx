'use client'


import { FC, useEffect } from 'react'
import styles from './Payment.module.css'

// 

interface PaymentInterface {
  payment: any
}

const Payment: FC<PaymentInterface> = ({ payment }) => {


  const { setPaymentState } = payment


  useEffect(() => {
    // 1. Динамически подключаем CSS ЮKassa
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://yookassa.ru/integration/simplepay/css/yookassa_construct_form.css?v=1.37.0';
    document.head.appendChild(link);

    // 2. Динамически подключаем JS ЮKassa
    const script = document.createElement('script');
    script.src = 'https://yookassa.ru/integration/simplepay/js/yookassa_construct_form.js?v=1.37.0';
    script.async = true;
    document.body.appendChild(script);

    // Очистка при размонтировании компонента
    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);






  function closeModel () {

    const close = window.confirm('Уверены что хотите выйти?')


    if (close) {
       setPaymentState(false)
    }

    return


  }



  return (
    <div className={styles.container}>

        <div className={styles.wrapper}>
          <div
            className={styles.close_modal}
            onClick={closeModel}
            >&#10005;
          </div>

          <form className="yoomoney-payment-form" acceptCharset="utf-8" action="https://yookassa.ru/integration/simplepay/payment" method="post">

              <div className="ym-products">
              <div className="ym-block-title ym-products-title">Товары</div>

              <div className="ym-product">
                      <div className="ym-product-line">
                          <span className="ym-product-description">Книга автора методики  Звуконетика — в вашей библиотеке</span>
                          <span className="ym-product-price" data-price="3500" data-id="93" data-count="1">3 500&nbsp;₽</span>
                      </div>
                      <div className="ym-product-line ym-align-items-center">
                          <span className="ym-label-text">Количество</span>
                          <div className="ym-count-input">
                              <input className="ym-input" defaultValue="1.00" type="number" step="any" />
                              <span className="ym-count-control ym-count-plus"></span>
                              <span className="ym-count-control ym-count-minus"></span>
                          </div>
                      </div>
                  <input disabled type="hidden" name="text" defaultValue="Книга автора методики  Звуконетика — в вашей библиотеке"/>
                  
                  <input disabled type="hidden" name="price" defaultValue="10"/>
                  
                  <input disabled type="hidden" name="quantity" defaultValue="1"/>
                  
                  <input disabled type="hidden" name="paymentSubjectType" defaultValue="commodity" />
                  
                  <input disabled type="hidden" name="paymentMethodType" defaultValue="full_prepayment" />
                  
                  <input disabled type="hidden" name="tax" defaultValue="1" />
                  
                  </div></div>
              <input defaultValue="" type="hidden" name="ym_merchant_receipt" />

              <div className="ym-customer-info">
                  <div className="ym-block-title">О покупателе</div>
                  <input name="cps_email" className="ym-input" placeholder="Email" type="text" />
                  <input name="cps_phone" className="ym-input" placeholder="Телефон" type="text" />
                  <input name="custName" className="ym-input" placeholder="ФИО" type="text" />
                  
                  <p style={{
                    marginTop: '10px',
                    fontSize: '13px',
                  }}>В комментарии укажите как вам удобно забрать книгу
                  <br />
                  <b> (на мероприятии или доставкой). </b> </p>
                  <textarea className="ym-textarea" name="orderDetails" placeholder="Комментарий" />
              </div>

              <div className="ym-hidden-inputs">
                
                
                
              </div>

              
              
              <div className="ym-payment-btn-block ym-before-line ym-align-space-between">
                  <div className="ym-input-icon-rub ym-display-none">
                      <input name="sum" placeholder="0.00" className="ym-input ym-sum-input ym-required-input" type="number" step="any" defaultValue="10" />
                  </div>
                  <button type="submit" data-text="Оплатить" className="ym-btn-pay ym-result-price">
                    
                    <span className="ym-text-crop">Оплатить</span>
                    <span className="ym-price-output">10,00&nbsp;₽</span>
                  </button>
                  
                  <img src="https://yookassa.ru/integration/simplepay/img/iokassa-gray.svg?v=1.37.0" className="ym-logo" width="114" height="27" alt="ЮKassa" />
              </div>
              <input name="shopId" type="hidden" value="1484624" />


          </form>

        </div>
    </div>

  )
}

export default Payment