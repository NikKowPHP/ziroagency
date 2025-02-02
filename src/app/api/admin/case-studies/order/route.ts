import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { revalidateTag } from 'next/cache';
import { CACHE_TAGS } from '@/lib/utils/cache';

export async function PUT(request: NextRequest) {
  try {
    const { orders, locale } = await request.json();
    // orders should be an array of { id: string, order: number }
    for (const { id, order } of orders) {
      const { error } = await supabaseAdmin!
        .from(`case_studies_${locale}`)
        .update({ order_index: order })
        .eq('id', id);

      if (error) {
        console.error('Failed to update order for id:', id, error);
        throw error;
      }
    }

    // Optionally, force a cache revalidation
    revalidateTag(CACHE_TAGS.CASE_STUDIES);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating case study order:', error);
    return NextResponse.json(
      {
        error: 'Failed to update case study order',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}