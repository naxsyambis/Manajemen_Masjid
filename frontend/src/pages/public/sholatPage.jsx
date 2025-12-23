import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

router.get('/prayer-times', async (req, res) => {
  try {
    const response = await axios.get(
      'https://jadwalsholathariini.id/api/v1/daily?city=bantul'
    );

    res.json({
      status: 'success',
      location: 'Panjangrejo, Bantul',
      data: response.data.data,
    });
  } catch (error) {
    console.error('Gagal mengambil jadwal sholat:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Gagal mengambil jadwal sholat',
    });
  }
});


export default SholatPage;