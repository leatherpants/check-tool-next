import { fetchAllChecks } from '@/app/lib/data';
import { ChecksTable } from '@/app/lib/definitions';
import { getDateStringInRussianFormat } from '@/app/lib/utils';
import '@/app/ui/checks/print.scss';

export default async function Page() {

  const checklist = await fetchAllChecks();

  const pagesForRendering = [];

  const { totalSum, totalNds } = getTotal(checklist);

  if (checklist.length < 7) {
    pagesForRendering.push(
      generatePage(checklist, 'first-page', true, totalSum, totalNds),
    );
  } else {
    const copiedList = [...checklist];
    const first7ListItems = copiedList.splice(0, 7);
    pagesForRendering.push(
      generatePage(first7ListItems, 'first-page')
    );

    while (copiedList.length > 11) {
      const twelveItems = copiedList.splice(0, 12);
      pagesForRendering.push(
        generatePage(twelveItems, 'another-page')
      );
    }
    pagesForRendering.push(
      generatePage(copiedList, 'another-page', true, totalSum, totalNds),
    );
  }

  return (<>
    {pagesForRendering}
  </>);
}

function generatePage(list: ChecksTable[], pageClass: string, hasTotal = false, totalSum = 0, totalNds = 0) {
  return (<div className={pageClass + ' page'}>
    <div className="container">
      {list.map(item => {
        return (
          <div className="row" key={item.id}>
            <div className="type">{item.company_type}</div>
            <div className="date">{getDateStringInRussianFormat(item.date)}</div>
            <div className="number">Чек №{item.number}</div>
            <div className="company">{item.company_name}</div>
            <div className="sum">
              <div className="price">
                {(item.sum / 100).toFixed(2)}
              </div>
              <div className="nds">
                {(((item.nds10 ?? 0) + (item.nds20 ?? 0)) / 100).toFixed(2)}
              </div>
            </div>
          </div>
        );
      })}
      {hasTotal && (
        <div className="row">
          <div className="type">{'Итоги'}</div>
          <div className="sum">
            <div className="price">
              {(totalSum / 100).toFixed(2)}
            </div>
            <div className="nds">
              {(totalNds / 100).toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  </div>);
}

function getTotal(list: ChecksTable[]) {
  const totalSum = list.map(item => item.sum).reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);

  const totalNds = list.map(item => (item.nds10 ?? 0) + (item.nds20 ?? 0)).reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);

  return { totalSum, totalNds };
}