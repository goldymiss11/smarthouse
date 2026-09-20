import React, { useState, useMemo } from 'react';
import styles from './UKBroadcastScreen.module.css';

const MOCK_ADDRESSES = [
  { id: '1', name: 'ул. Космонавтов 34а', district: 'Центральный' },
  { id: '2', name: 'ул. Космонавтов 34б', district: 'Центральный' },
  { id: '3', name: 'ул. Садовая 15', district: 'Северный' },
  { id: '4', name: 'ул. Садовая 17', district: 'Северный' },
  { id: '5', name: 'ЖК "Изумрудный"', district: 'Южный' },
  { id: '6', name: 'ЖК "Акварель"', district: 'Южный' },
  { id: '7', name: 'ул. Ленина 10', district: 'Центральный' },
];

const FILTER_TABS = [
  { id: 'all', label: 'Все' },
  { id: 'Центральный', label: 'Центральный р-н' },
  { id: 'Северный', label: 'Северный р-н' },
  { id: 'Южный', label: 'Южный р-н' },
];

const categoryOptions = [
  { id: 'water', label: 'Вода (Отключение / Авария)' },
  { id: 'electro', label: 'Свет (Электричество)' },
  { id: 'elevator', label: 'Лифт (Ремонт)' },
  { id: 'other', label: 'Другое' },
];

export const UKBroadcastScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [category, setCategory] = useState(categoryOptions[0].id);
  const [message, setMessage] = useState('');

  // Вычисляем отфильтрованный список адресов
  const filteredAddresses = useMemo(() => {
    return MOCK_ADDRESSES.filter(addr => {
      const matchesSearch = addr.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            addr.district.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'all' || addr.district === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  // Проверка состояния главной кнопки "Выбрать все"
  const allFilteredSelected = filteredAddresses.length > 0 && filteredAddresses.every(addr => selectedIds.has(addr.id));
  const someSelected = selectedIds.size > 0;

  const toggleAll = () => {
    const next = new Set(selectedIds);
    if (allFilteredSelected) {
      // Снимаем выделение только с отфильтрованных
      filteredAddresses.forEach(addr => next.delete(addr.id));
    } else {
      // Выделяем все отфильтрованные
      filteredAddresses.forEach(addr => next.add(addr.id));
    }
    setSelectedIds(next);
  };

  const toggleAddress = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const [isSending, setIsSending] = useState(false);
  const handleSubmit = async () => {
    if (!someSelected || !message) return;
    setIsSending(true);
    try {
      await new Promise(r => setTimeout(r, 1500));
      alert("Рассылка успешно отправлена!");
      setMessage("");
      setSelectedIds(new Set());
    } catch (e) {
      console.error(e);
      alert("Ошибка отправки");
    } finally {
      setIsSending(false);
    }
  };

  const handleImproveText = () => {
    if (!message) {
      setMessage('Уважаемые жители! Уведомляем вас о временном отключении водоснабжения в связи с проведением плановых технических работ. Приносим извинения за неудобства.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <header className={`${styles.header} ${styles.animateStagger1}`}>
          <h1 className={styles.title}>Рассылка</h1>
        </header>

        <section className={styles.animateStagger2}>
          <h2 className={styles.sectionTitle}>Адресаты</h2>
          <div className={styles.targetBlock}>
            
            {/* Поиск */}
            <div className={styles.searchWrapper}>
              <div className={styles.searchIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <input 
                type="text" 
                className={styles.searchInput} 
                placeholder="Поиск по улице или району..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Фильтры (Chips) */}
            <div className={styles.filterScroll}>
              {FILTER_TABS.map(tab => (
                <button 
                  key={tab.id}
                  className={`${styles.filterChip} ${activeFilter === tab.id ? styles.active : ''}`}
                  onClick={() => setActiveFilter(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Чекбокс "Выбрать все" для текущего списка */}
            <div className={styles.checkboxRow} onClick={toggleAll} style={{ paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div className={`${styles.checkboxIcon} ${allFilteredSelected ? styles.checked : ''}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className={styles.checkboxLabel} style={{ fontWeight: 600 }}>
                {allFilteredSelected ? 'Снять выделение со всех' : 'Выбрать все отфильтрованные'}
              </span>
            </div>

            {/* Список адресов */}
            <div className={styles.addressList}>
              {filteredAddresses.length > 0 ? (
                filteredAddresses.map(addr => (
                  <div key={addr.id} className={styles.checkboxRow} onClick={() => toggleAddress(addr.id)}>
                    <div className={`${styles.checkboxIcon} ${selectedIds.has(addr.id) ? styles.checked : ''}`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className={`${styles.checkboxLabel} ${selectedIds.has(addr.id) ? '' : styles.dimmed}`}>
                        {addr.name}
                      </span>
                      <span style={{ fontSize: '12px', color: 'rgba(235,235,245,0.4)', marginTop: '2px' }}>
                        {addr.district} район
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <span style={{ color: 'rgba(235,235,245,0.4)', fontSize: '15px', textAlign: 'center', padding: '16px 0' }}>
                  Ничего не найдено
                </span>
              )}
            </div>

          </div>
        </section>

        <section className={styles.animateStagger3}>
          <h2 className={styles.sectionTitle}>Сообщение</h2>
          <div className={styles.messageBuilder}>
            <div className={styles.selectWrapper}>
              <select 
                className={styles.select} 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categoryOptions.map(cat => (
                  <option key={cat.id} value={cat.id} style={{ color: '#000' }}>{cat.label}</option>
                ))}
              </select>
              <div className={styles.selectIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            <textarea 
              className={styles.textarea}
              placeholder="Введите суть сообщения (например: отключаем воду завтра в 10:00 из-за прорыва)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button className={styles.aiButton} onClick={handleImproveText}>
              <svg className={styles.aiIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className={styles.aiText}>Улучшить текст с ИИ</span>
            </button>
          </div>
        </section>

        <div className={styles.animateStagger4}>
          <button className={styles.submitButton} onClick={handleSubmit} disabled={!someSelected || !message || isSending}>
            {isSending ? "Отправка..." : `Запустить рассылку ${someSelected ? '(' + selectedIds.size + ')' : ''}`}
          </button>
        </div>
      </div>
    </div>
  );
};
