<template>
    <div class="p-1 md:p-6 font-display my-8 mx-4 md:m-8 bg-yellow-200 rounded-md">
        <div class="">
            <p class="font-bold text-center text-2xl md:text-4xl ">Past Presidents</p>
        </div>
        <div class=" p-1 md:p-6 my-8 mx-4 md:m-8 text-base md:text-2xl">
            <table class="table-fixed border-separate border-spacing-2 border border-slate-100 mx-auto w-full text-center">
                <thead>
                    <tr>
                    <th class="border border-slate-200">Name</th>
                    <th class="border border-slate-200">Year</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tableData" :key="index">
                        <td class="border border-slate-200">{{ item.name }}</td> <td class="border border-slate-200">{{ item.tenure }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    </div>
</template>

<script setup>
// Import any required libraries, e.g., for date formatting

// Define your data array
const tableData = [
    { name: 'Egbedeyi A.S' , tenure: '1968/1969' },
    { name: 'Adefihan T.A' , tenure:  '1976/1977' },
    { name: 'Abegunde A.' , tenure: '1982/1983' },
    { name: 'Jaiyesimi A.O' , tenure: '1983/1984' },
    { name: 'Bello O.M' , tenure: '1984/1985' },
    { name: 'Momah D.N' , tenure: '1985/1986'},
    { name: 'Ayanniyi O.' , tenure: '1986/1987' },
    { name: 'Osuamadi A.C' , tenure: '1987/1988' },
    { name: 'Toweh P.O' , tenure: '1989/1990' },
    { name: 'Onyekwere I.L' , tenure: '1990/1991' },
    { name: 'Adebari O.A' , tenure: '1991/1992' },
    { name: 'Aluko J.O' , tenure: '1992/1993' },
    { name: 'Adebiyi R.A' , tenure: '1995/1996' },
    { name: 'Jegede F.B' , tenure: '1996/1997' },
    { name: 'Adeniyi A.F' , tenure: '1997/1998' },
    { name: 'Aba S.O.F' , tenure: '1998/1999' },
    { name: 'Njoku S.O.N' , tenure: '2000/2001' },
    { name: 'Mordi U.B' , tenure: '2002/2003' },
    { name: 'Kareem R.O' , tenure: '2003/2004' },
    { name: 'Odunowo O.M' , tenure: '2004/2005' },
    { name: 'Adewunmi I.O' , tenure: '2005/2006' },
    { name: 'Agbomeji O.O' , tenure: '2007/2008' },
    { name: 'Salam O.M' , tenure: '2008/2009' },
    { name: 'Obidiegwu C.J' , tenure: '2009/2010' },
    { name: 'Dosa G.T.B' , tenure: '2010/2011' },
    { name: 'Agbomeji O.T' , tenure: '2011/2012' },
    { name: 'Fadero O.S' , tenure: '2012/2013' },
    { name: 'Aba S.S' , tenure: '2013/2014' },
    { name: 'Olasanoye O.T' , tenure: '2014/2015' },
    { name: 'Ekwueme C.C' , tenure: '2015/2016'},
    { name: 'Oni O.G' , tenure: '2016/2017' },
    { name: 'Gbonjubola Y.T' , tenure: '2017/2018' },
    { name: 'Oluwatayo Damilola S.' , tenure: '2019/2021' },
    { name: 'Adetunji Harrison' , tenure: '2021/2022' },
    { name: 'Adeyemo Dorcas A.' , tenure: '2022/2023' },

  // Add more objects as needed
];

// Additional functions for formatting, sorting, etc. (optional)
</script>