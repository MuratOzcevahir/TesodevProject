import React from 'react'

function Footer() {
    return (
        <div id='main-footer'>
            <div className='container-fluid p-2 p-lg-5'>
                <div className='row'>
                    <div className='col-12 col-lg-7'>
                        <div className='d-flex align-items-center justify-content-center h-100 gap-3 '>
                            <div>
                                <img src="https://www.tesodev.com/getimg/5c9b3f3ea80e95155c456632/340" />
                            </div>
                            <div className='d-flex flex-column gap-5'>
                                <div className='d-flex flex-column '>
                                    <span>İletişim:</span>
                                    <span>Adres: Çifte Havuzlar Mah. Eski Londra Asfaltı Cad. Kuluçka Merkezi D2 Blok No: 151/1F İç Kapı No:2803 Esenler/İstanbul</span>
                                </div>
                                <span>Email:bilgi@tesodev.com</span>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-lg-5'>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.2795624019136!2d28.888373175623297!3d41.019139318756636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cabb7abf29ba35%3A0xc98f44e9057adcde!2zVGVzb2RldiBZYXrEsWzEsW0!5e0!3m2!1str!2str!4v1700852184997!5m2!1str!2str" width="100%" height="300" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer