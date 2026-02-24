import { useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, CreditCard, X, Copy, Check, MessageCircle, ShieldCheck, Clock, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const MASTERCARD_NUMBER = '5300 1234 5678 9012';
const USER_PHONE = '07701234567';

export default function WalletPage() {
    const { t, isRTL } = useLanguage();
    const [activeTab, setActiveTab] = useState('all');
    const [modalType, setModalType] = useState(null);
    const [methodType, setMethodType] = useState(null);
    const [copied, setCopied] = useState(false);
    const [withdrawCard, setWithdrawCard] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [depositAmount, setDepositAmount] = useState('');
    const [depositPhone, setDepositPhone] = useState(USER_PHONE);
    const [depositSuccess, setDepositSuccess] = useState(false);
    const [withdrawSuccess, setWithdrawSuccess] = useState(false);
    const balance = 105000;

    const transactions = [
        { id: 1, type: 'credit', title: t('txDepositBalance'), amount: 50000, date: '2026-02-24', status: 'completed' },
        { id: 2, type: 'debit', title: `${t('txBuyCourse')} - تقويم الأسنان`, amount: 75000, date: '2026-02-23', status: 'completed' },
        { id: 3, type: 'credit', title: t('txRefund'), amount: 25000, date: '2026-02-22', status: 'completed' },
        { id: 4, type: 'debit', title: `${t('txBuyCourse')} - تجميل الأسنان`, amount: 95000, date: '2026-02-21', status: 'completed' },
        { id: 5, type: 'credit', title: t('txDepositBalance'), amount: 200000, date: '2026-02-20', status: 'completed' },
    ];

    const WHATSAPP_NUMBERS = [
        { label: t('techSupport'), number: '+9647701234567' },
        { label: t('walletDept'), number: '+9647709876543' },
    ];

    const filtered = activeTab === 'all'
        ? transactions
        : transactions.filter(tx => tx.type === activeTab);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text.replace(/\s/g, ''));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const openWhatsApp = (number) => {
        window.open(`https://wa.me/${number.replace('+', '')}`, '_blank');
    };

    const closeModal = () => {
        setModalType(null);
        setMethodType(null);
        setWithdrawCard('');
        setWithdrawAmount('');
        setDepositAmount('');
        setDepositPhone(USER_PHONE);
        setDepositSuccess(false);
        setWithdrawSuccess(false);
    };

    const handleDepositSubmit = () => {
        if (!depositAmount || !depositPhone) return;
        setDepositSuccess(true);
    };

    const handleWithdrawSubmit = () => {
        if (!withdrawAmount || !withdrawCard) return;
        setWithdrawSuccess(true);
    };

    const getModalTitle = () => {
        if (!methodType) return modalType === 'deposit' ? t('depositBalance') : t('withdrawBalance');
        const method = methodType === 'mastercard' ? t('masterCard') : t('zainCash');
        return modalType === 'deposit' ? `${t('depositVia')} ${method}` : `${t('withdrawVia')} ${method}`;
    };

    const backArrow = isRTL ? '←' : '→';

    return (
        <div className="page wallet-page">
            {/* بطاقة الرصيد */}
            <div className="wallet-hero">
                <div className="wallet-hero-bg">
                    <div className="wallet-hero-circle c1" />
                    <div className="wallet-hero-circle c2" />
                    <div className="wallet-hero-circle c3" />
                </div>
                <div className="wallet-hero-content">
                    <div className="wallet-hero-top">
                        <ShieldCheck size={20} className="wallet-shield" />
                        <span className="wallet-secure-label">{t('secureWallet')}</span>
                    </div>
                    <p className="wallet-balance-label">{t('currentBalance')}</p>
                    <h2 className="wallet-balance-amount">
                        <span className="wallet-balance-num">{balance.toLocaleString()}</span>
                        <span className="wallet-balance-currency">{t('currency')}</span>
                    </h2>
                    <div className="wallet-hero-actions">
                        <button className="wallet-hero-btn deposit" onClick={() => setModalType('deposit')}>
                            <ArrowDownLeft size={18} />
                            <span>{t('depositBtn')}</span>
                        </button>
                        <button className="wallet-hero-btn withdraw" onClick={() => setModalType('withdraw')}>
                            <ArrowUpRight size={18} />
                            <span>{t('withdrawBtn')}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* إحصائيات سريعة */}
            <div className="wallet-stats">
                <div className="wallet-stat-item">
                    <ArrowDownLeft size={16} className="stat-icon credit" />
                    <div>
                        <span className="stat-value credit">+275,000</span>
                        <span className="stat-label">{t('totalDeposits')}</span>
                    </div>
                </div>
                <div className="wallet-stat-divider" />
                <div className="wallet-stat-item">
                    <ArrowUpRight size={16} className="stat-icon debit" />
                    <div>
                        <span className="stat-value debit">-170,000</span>
                        <span className="stat-label">{t('totalPurchases')}</span>
                    </div>
                </div>
            </div>

            {/* المعاملات */}
            <div className="wallet-section">
                <h2 className="section-title">{t('transactions')}</h2>
                <div className="wallet-tabs">
                    <button className={`wallet-tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>{t('all')}</button>
                    <button className={`wallet-tab credit-tab ${activeTab === 'credit' ? 'active' : ''}`} onClick={() => setActiveTab('credit')}>{t('deposits')}</button>
                    <button className={`wallet-tab debit-tab ${activeTab === 'debit' ? 'active' : ''}`} onClick={() => setActiveTab('debit')}>{t('purchases')}</button>
                </div>

                <div className="wallet-transactions" key={activeTab}>
                    {filtered.map(tx => (
                        <div key={tx.id} className="tx-item">
                            <div className={`tx-icon ${tx.type}`}>
                                {tx.type === 'credit' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                            </div>
                            <div className="tx-info">
                                <h4>{tx.title}</h4>
                                <p>{tx.date}</p>
                            </div>
                            <span className={`tx-amount ${tx.type}`}>
                                {tx.type === 'credit' ? '+' : '-'}{tx.amount.toLocaleString()} {t('currency')}
                            </span>
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-state-icon">💳</div>
                        <h3 className="empty-state-title">{t('noTransactions')}</h3>
                    </div>
                )}
            </div>

            {/* ===== مودال الإيداع / السحب ===== */}
            {modalType && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{getModalTitle()}</h3>
                            <button className="modal-close" onClick={closeModal}><X size={18} /></button>
                        </div>

                        {/* اختيار الطريقة */}
                        {!methodType && (
                            <div className="deposit-methods">
                                <button className="deposit-method-card" onClick={() => setMethodType('mastercard')}>
                                    <div className="deposit-method-icon mastercard">
                                        <CreditCard size={24} />
                                    </div>
                                    <div className="deposit-method-info">
                                        <h4>{t('masterCard')}</h4>
                                        <p>{modalType === 'deposit' ? t('masterCardDesc') : t('masterCardWithdrawDesc')}</p>
                                    </div>
                                </button>
                                <button className="deposit-method-card" onClick={() => setMethodType('zaincash')}>
                                    <div className="deposit-method-icon zaincash">
                                        <span style={{ fontSize: 24 }}>💰</span>
                                    </div>
                                    <div className="deposit-method-info">
                                        <h4>{t('zainCash')}</h4>
                                        <p>{modalType === 'deposit' ? t('zainCashDesc') : t('zainCashWithdrawDesc')}</p>
                                    </div>
                                </button>
                            </div>
                        )}

                        {/* ===== تفاصيل الإيداع - ماستر كارد ===== */}
                        {methodType === 'mastercard' && modalType === 'deposit' && (
                            <div className="deposit-details">
                                {depositSuccess ? (
                                    <div className="deposit-success-full">
                                        <div className="deposit-success-icon"><Check size={34} /></div>
                                        <h3>{t('requestSentSuccess')}</h3>
                                        <p>{t('reviewDeposit24h')}</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mastercard-visual">
                                            <div className="mc-card">
                                                <div className="mc-card-top">
                                                    <span className="mc-chip">💳</span>
                                                    <span className="mc-brand">MASTERCARD</span>
                                                </div>
                                                <div className="mc-number">{MASTERCARD_NUMBER}</div>
                                                <div className="mc-bottom">
                                                    <span>DentLearn</span>
                                                    <span>XX/XX</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="copy-card-btn" onClick={() => handleCopy(MASTERCARD_NUMBER)}>
                                            {copied ? <><Check size={14} /> {t('copied')}</> : <><Copy size={14} /> {t('copyCardNumber')}</>}
                                        </button>
                                    </>
                                )}

                                <div className="withdraw-form">
                                    <label className="withdraw-label">{t('depositAmount')}</label>
                                    <div className="withdraw-input-group styled-input">
                                        <input
                                            type="text"
                                            placeholder="0"
                                            value={depositAmount ? Number(depositAmount).toLocaleString() : ''}
                                            onChange={(e) => setDepositAmount(e.target.value.replace(/,/g, '').replace(/[^0-9]/g, ''))}
                                            className="withdraw-input center-white"
                                        />
                                        <span className="withdraw-currency">{t('currency')}</span>
                                    </div>

                                    <label className="withdraw-label">{t('phoneNumber')}</label>
                                    <input
                                        type="tel"
                                        value={depositPhone}
                                        onChange={(e) => setDepositPhone(e.target.value)}
                                        className="withdraw-input full center-white"
                                        dir="ltr"
                                    />
                                </div>

                                <div className="deposit-notice">
                                    <p className="deposit-notice-title">{t('importantNote')}</p>
                                    <p>{t('mcDepositNote')}</p>
                                </div>

                                {!depositSuccess && (
                                    <button className="withdraw-submit-btn deposit-submit" onClick={handleDepositSubmit} disabled={!depositAmount || !depositPhone}>
                                        <Send size={16} />
                                        <span>{t('sendDepositRequest')}</span>
                                    </button>
                                )}

                                <div className="whatsapp-contacts">
                                    <p className="whatsapp-title">{t('whatsappContactTitle')}</p>
                                    {WHATSAPP_NUMBERS.map((w, i) => (
                                        <button key={i} className="whatsapp-btn" onClick={() => openWhatsApp(w.number)}>
                                            <MessageCircle size={16} />
                                            <div>
                                                <span className="wa-label">{w.label}</span>
                                                <span className="wa-number">{w.number}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <button className="deposit-back-btn" onClick={() => { setMethodType(null); setDepositSuccess(false); }}>{backArrow} {t('back')}</button>
                            </div>
                        )}

                        {/* ===== تفاصيل الإيداع - زين كاش ===== */}
                        {methodType === 'zaincash' && modalType === 'deposit' && (
                            <div className="deposit-details">
                                {depositSuccess ? (
                                    <div className="deposit-success-full">
                                        <div className="deposit-success-icon"><Check size={34} /></div>
                                        <h3>{t('requestSentSuccess')}</h3>
                                        <p>{t('reviewDeposit24h')}</p>
                                    </div>
                                ) : (
                                    <div className="zaincash-visual">
                                        <span style={{ fontSize: 48 }}>💰</span>
                                        <h3>{t('zainCash')}</h3>
                                    </div>
                                )}

                                <div className="withdraw-form">
                                    <label className="withdraw-label">{t('depositAmount')}</label>
                                    <div className="withdraw-input-group styled-input">
                                        <input
                                            type="text"
                                            placeholder="0"
                                            value={depositAmount ? Number(depositAmount).toLocaleString() : ''}
                                            onChange={(e) => setDepositAmount(e.target.value.replace(/,/g, '').replace(/[^0-9]/g, ''))}
                                            className="withdraw-input center-white"
                                        />
                                        <span className="withdraw-currency">{t('currency')}</span>
                                    </div>

                                    <label className="withdraw-label">{t('phoneNumber')}</label>
                                    <input
                                        type="tel"
                                        value={depositPhone}
                                        onChange={(e) => setDepositPhone(e.target.value)}
                                        className="withdraw-input full center-white"
                                        dir="ltr"
                                    />
                                </div>

                                <div className="deposit-notice">
                                    <p className="deposit-notice-title">{t('importantNote')}</p>
                                    <p>{t('zcDepositNote')}</p>
                                </div>

                                {!depositSuccess && (
                                    <button className="withdraw-submit-btn deposit-submit" onClick={handleDepositSubmit} disabled={!depositAmount || !depositPhone}>
                                        <Send size={16} />
                                        <span>{t('sendDepositRequest')}</span>
                                    </button>
                                )}

                                <div className="whatsapp-contacts">
                                    <p className="whatsapp-title">{t('whatsappContactTitle')}</p>
                                    {WHATSAPP_NUMBERS.map((w, i) => (
                                        <button key={i} className="whatsapp-btn" onClick={() => openWhatsApp(w.number)}>
                                            <MessageCircle size={16} />
                                            <div>
                                                <span className="wa-label">{w.label}</span>
                                                <span className="wa-number">{w.number}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <button className="deposit-back-btn" onClick={() => { setMethodType(null); setDepositSuccess(false); }}>{backArrow} {t('back')}</button>
                            </div>
                        )}

                        {/* ===== تفاصيل السحب - ماستر كارد ===== */}
                        {methodType === 'mastercard' && modalType === 'withdraw' && (
                            <div className="deposit-details">
                                {withdrawSuccess && (
                                    <div className="request-success-banner">
                                        <Check size={18} />
                                        <span>{t('requestSentSuccess')} ✅</span>
                                    </div>
                                )}
                                <div className="withdraw-form">
                                    <label className="withdraw-label">{t('withdrawRequested')}</label>
                                    <div className="withdraw-input-group">
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={withdrawAmount}
                                            onChange={(e) => setWithdrawAmount(e.target.value)}
                                            className="withdraw-input"
                                        />
                                        <span className="withdraw-currency">{t('currency')}</span>
                                    </div>

                                    <label className="withdraw-label">{t('yourCardNumber')}</label>
                                    <input
                                        type="text"
                                        placeholder="XXXX XXXX XXXX XXXX"
                                        value={withdrawCard}
                                        onChange={(e) => setWithdrawCard(e.target.value)}
                                        className="withdraw-input full"
                                        dir="ltr"
                                        maxLength={19}
                                    />
                                </div>

                                <div className="deposit-notice withdraw-notice">
                                    <div className="notice-icon-row">
                                        <Clock size={16} />
                                        <p className="deposit-notice-title">{t('refundDuration')}</p>
                                    </div>
                                    <p>{t('mcRefundNote')}</p>
                                    <p>{t('thankYou')}</p>
                                </div>

                                <div className="whatsapp-contacts">
                                    <p className="whatsapp-title">{t('whatsappInquiry')}</p>
                                    {WHATSAPP_NUMBERS.map((w, i) => (
                                        <button key={i} className="whatsapp-btn" onClick={() => openWhatsApp(w.number)}>
                                            <MessageCircle size={16} />
                                            <div>
                                                <span className="wa-label">{w.label}</span>
                                                <span className="wa-number">{w.number}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {!withdrawSuccess && (
                                    <button className="withdraw-submit-btn" onClick={handleWithdrawSubmit} disabled={!withdrawAmount || !withdrawCard}>
                                        <ArrowUpRight size={16} />
                                        <span>{t('submitWithdrawRequest')}</span>
                                    </button>
                                )}
                                <button className="deposit-back-btn" onClick={() => { setMethodType(null); setWithdrawSuccess(false); }}>{backArrow} {t('back')}</button>
                            </div>
                        )}

                        {/* ===== تفاصيل السحب - زين كاش ===== */}
                        {methodType === 'zaincash' && modalType === 'withdraw' && (
                            <div className="deposit-details">
                                {withdrawSuccess && (
                                    <div className="request-success-banner">
                                        <Check size={18} />
                                        <span>{t('requestSentSuccess')} ✅</span>
                                    </div>
                                )}
                                <div className="zaincash-visual">
                                    <span style={{ fontSize: 48 }}>💰</span>
                                    <h3>{t('zainCash')}</h3>
                                </div>
                                <div className="withdraw-form">
                                    <label className="withdraw-label">{t('withdrawRequested')}</label>
                                    <div className="withdraw-input-group">
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={withdrawAmount}
                                            onChange={(e) => setWithdrawAmount(e.target.value)}
                                            className="withdraw-input"
                                        />
                                        <span className="withdraw-currency">{t('currency')}</span>
                                    </div>

                                    <label className="withdraw-label">{t('zainCashPhone')}</label>
                                    <input
                                        type="tel"
                                        placeholder="07XX XXX XXXX"
                                        value={withdrawCard}
                                        onChange={(e) => setWithdrawCard(e.target.value)}
                                        className="withdraw-input full"
                                        dir="ltr"
                                    />
                                </div>

                                <div className="deposit-notice withdraw-notice">
                                    <div className="notice-icon-row">
                                        <Clock size={16} />
                                        <p className="deposit-notice-title">{t('refundDuration')}</p>
                                    </div>
                                    <p>{t('zcRefundNote')}</p>
                                    <p>{t('thankYou')}</p>
                                </div>

                                <div className="whatsapp-contacts">
                                    <p className="whatsapp-title">{t('whatsappInquiry')}</p>
                                    {WHATSAPP_NUMBERS.map((w, i) => (
                                        <button key={i} className="whatsapp-btn" onClick={() => openWhatsApp(w.number)}>
                                            <MessageCircle size={16} />
                                            <div>
                                                <span className="wa-label">{w.label}</span>
                                                <span className="wa-number">{w.number}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {!withdrawSuccess && (
                                    <button className="withdraw-submit-btn" onClick={handleWithdrawSubmit} disabled={!withdrawAmount || !withdrawCard}>
                                        <ArrowUpRight size={16} />
                                        <span>{t('submitWithdrawRequest')}</span>
                                    </button>
                                )}
                                <button className="deposit-back-btn" onClick={() => { setMethodType(null); setWithdrawSuccess(false); }}>{backArrow} {t('back')}</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
