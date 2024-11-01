import { fetchAllChecks } from '@/app/lib/data';
import { ChecksTable } from '@/app/lib/definitions';
import { getDateStringInRussianFormat } from '@/app/lib/utils';
import clsx from 'clsx';
import { cookies } from 'next/headers';

export default async function Page() {

  await cookies();

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
  return (<div className={clsx({
    pageClass: true,
    'font-print bg-white block my-0 mx-auto mb-[0.5cm] shadow-xl w-[29.7cm] h-[21cm] bg-center bg-contain relative': true,
    "bg-[url('/bg2.png')]": pageClass === 'another-page',
    "bg-[url('/bg1.png')]": pageClass === 'first-page'
  })}>
    <div className={
      clsx({
        "absolute left-[1.2cm] right-[1.2cm] flex flex-col gap-[1.57cm]": true,
        'top-[9.35cm]': pageClass === 'first-page',
        'top-[1.5cm]': pageClass === 'another-page'
      })
    }>
      {list.map(item => {
        return (
          <div className="relative text-[10pt]" key={item.id}>
            <div className="absolute left-[0.3cm] text-[15pt]">{item.company_type}</div>
            <div className="absolute left-[7cm]">{getDateStringInRussianFormat(item.date)}</div>
            <div className="absolute left-[10.5cm] text-[12pt]">Чек №{item.number}</div>
            <div className="absolute left-[16.3cm] w-[5.3cm] text-[12pt] leading-[12pt] overflow-hidden break-words">{item.company_name}</div>
            <div className="absolute top-[-0.02cm] left-[27.3cm] tracking-[0.38cm] font-mono">
              <div className="absolute right-[0.1cm] text-end">
                {(item.sum / 100).toFixed(2)}
              </div>
              <div className="absolute right-[0.15cm] top-[0.65cm]">
                {(((item.nds10 ?? 0) + (item.nds20 ?? 0)) / 100).toFixed(2)}
              </div>
            </div>
          </div>
        );
      })}
      {hasTotal && (
        <div className="relative text-[10pt]">
          <div className="absolute left-[0.3cm] text-[15pt]">{'Итоги'}</div>
          <div className="absolute top-[-0.02cm] left-[27.3cm] tracking-[0.38cm] font-mono">
            <div className="absolute right-[0.1cm] text-end">
              {(totalSum / 100).toFixed(2)}
            </div>
            <div className="absolute right-[0.15cm] top-[0.65cm]">
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