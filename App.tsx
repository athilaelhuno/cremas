import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  Accion,
  GRUPOS_PA,
  PRODUCTOS,
  Producto,
  RANGOS_EDAD,
  TIPOS,
  Tipo,
  textoEdad,
} from './src/data';

const C = {
  bg: '#FBF7F4',
  card: '#FFFFFF',
  text: '#2B2321',
  muted: '#7A6C68',
  accent: '#B5577A',
  accentSoft: '#F6E3EA',
  border: '#EADFDA',
  chip: '#F2ECE9',
};

// Búsqueda sin distinguir mayúsculas ni tildes
const norm = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

const TODOS_PA = [...new Set(PRODUCTOS.flatMap((p) => p.principios))].sort((a, b) => a.localeCompare(b, 'es'));
const TODAS_ACCIONES = [...new Set(PRODUCTOS.flatMap((p) => p.acciones))].sort((a, b) => a.localeCompare(b, 'es'));

function Chip({ label, active, onPress }: { label: string; active?: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.chipActive]}>
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

function FiltroFila<T extends string>({
  titulo,
  opciones,
  valor,
  onChange,
}: {
  titulo: string;
  opciones: T[];
  valor: T | null;
  onChange: (v: T | null) => void;
}) {
  return (
    <View style={styles.filtro}>
      <Text style={styles.filtroTitulo}>{titulo}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
        <Chip label="Todos" active={valor === null} onPress={() => onChange(null)} />
        {opciones.map((o) => (
          <Chip key={o} label={o} active={valor === o} onPress={() => onChange(valor === o ? null : o)} />
        ))}
      </ScrollView>
    </View>
  );
}

function SelectorPA({
  visible,
  onClose,
  onSelect,
}: {
  visible: boolean;
  onClose: () => void;
  onSelect: (pa: string | null) => void;
}) {
  const [q, setQ] = useState('');
  const lista = TODOS_PA.filter((pa) => norm(pa).includes(norm(q)));
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.screen}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitulo}>Principio activo</Text>
          <Pressable onPress={onClose} hitSlop={12}>
            <Text style={styles.link}>Cerrar</Text>
          </Pressable>
        </View>
        <TextInput
          style={styles.search}
          placeholder="Buscar principio activo…"
          placeholderTextColor={C.muted}
          value={q}
          onChangeText={setQ}
          autoCorrect={false}
        />
        <FlatList
          data={lista}
          keyExtractor={(x) => x}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={
            <Pressable style={styles.paItem} onPress={() => onSelect(null)}>
              <Text style={[styles.paItemText, { color: C.accent }]}>Todos los principios activos</Text>
            </Pressable>
          }
          renderItem={({ item }) => {
            const n = PRODUCTOS.filter((p) => p.principios.includes(item)).length;
            return (
              <Pressable style={styles.paItem} onPress={() => onSelect(item)}>
                <Text style={styles.paItemText}>{item}</Text>
                <Text style={styles.muted}>{n}</Text>
              </Pressable>
            );
          }}
        />
      </SafeAreaView>
    </Modal>
  );
}

function Tarjeta({ p, onPA }: { p: Producto; onPA: (pa: string) => void }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitulo}>{p.nombre}</Text>
      <View style={styles.badges}>
        {p.tipos.map((t) => (
          <Text key={t} style={styles.badge}>
            {t}
          </Text>
        ))}
        <Text style={[styles.badge, styles.badgeEdad]}>{textoEdad(p.edad)}*</Text>
      </View>

      <Text style={styles.label}>Principios activos</Text>
      <Text style={styles.cardText}>{p.principiosTexto}</Text>
      {p.principios.length > 0 && (
        <View style={styles.paRow}>
          {p.principios.map((pa) => (
            <Pressable key={pa} onPress={() => onPA(pa)} style={styles.paChip}>
              <Text style={styles.paChipText}>{pa}</Text>
            </Pressable>
          ))}
        </View>
      )}

      <Text style={styles.label}>Acción</Text>
      <Text style={styles.cardText}>{p.accionTexto}</Text>
    </View>
  );
}

function Productos() {
  const [q, setQ] = useState('');
  const [tipo, setTipo] = useState<Tipo | null>(null);
  const [accion, setAccion] = useState<Accion | null>(null);
  const [edad, setEdad] = useState<string | null>(null);
  const [pa, setPa] = useState<string | null>(null);
  const [selectorPA, setSelectorPA] = useState(false);
  const [verFiltros, setVerFiltros] = useState(true);

  const resultados = useMemo(() => {
    const nq = norm(q.trim());
    const rango = RANGOS_EDAD.find((r) => r.label === edad);
    return PRODUCTOS.filter((p) => {
      if (tipo && !p.tipos.includes(tipo)) return false;
      if (accion && !p.acciones.includes(accion)) return false;
      if (pa && !p.principios.includes(pa)) return false;
      if (rango) {
        const [min, max] = p.edad;
        if (min > rango.max || (max ?? 999) < rango.min) return false;
      }
      if (nq) {
        const texto = norm([p.nombre, p.principiosTexto, p.principios.join(' '), p.accionTexto, p.acciones.join(' ')].join(' '));
        if (!texto.includes(nq)) return false;
      }
      return true;
    });
  }, [q, tipo, accion, edad, pa]);

  const nFiltros = [tipo, accion, edad, pa].filter(Boolean).length;
  const limpiar = () => {
    setQ('');
    setTipo(null);
    setAccion(null);
    setEdad(null);
    setPa(null);
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.search}
        placeholder="Buscar por nombre, principio activo o acción…"
        placeholderTextColor={C.muted}
        value={q}
        onChangeText={setQ}
        autoCorrect={false}
        clearButtonMode="while-editing"
      />

      <View style={styles.barra}>
        <Pressable onPress={() => setVerFiltros(!verFiltros)} hitSlop={8}>
          <Text style={styles.link}>
            {verFiltros ? 'Ocultar filtros' : 'Mostrar filtros'}
            {nFiltros > 0 ? ` (${nFiltros})` : ''}
          </Text>
        </Pressable>
        {(nFiltros > 0 || q !== '') && (
          <Pressable onPress={limpiar} hitSlop={8}>
            <Text style={styles.link}>Limpiar</Text>
          </Pressable>
        )}
      </View>

      {verFiltros && (
        <View>
          <FiltroFila titulo="Tipo" opciones={TIPOS} valor={tipo} onChange={setTipo} />
          <FiltroFila titulo="Acción" opciones={TODAS_ACCIONES} valor={accion} onChange={setAccion} />
          <FiltroFila
            titulo="Edad de la clienta"
            opciones={RANGOS_EDAD.map((r) => r.label)}
            valor={edad}
            onChange={setEdad}
          />
          <View style={styles.filtro}>
            <Text style={styles.filtroTitulo}>Principio activo</Text>
            <View style={styles.chipRow}>
              <Chip label={pa ?? 'Elegir…'} active={pa !== null} onPress={() => setSelectorPA(true)} />
              {pa && <Chip label="✕" onPress={() => setPa(null)} />}
            </View>
          </View>
        </View>
      )}

      <FlatList
        data={resultados}
        keyExtractor={(p) => p.id}
        contentContainerStyle={styles.lista}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <Text style={styles.muted}>
            {resultados.length} producto{resultados.length === 1 ? '' : 's'}
          </Text>
        }
        ListEmptyComponent={<Text style={styles.vacio}>No hay productos con esos filtros.</Text>}
        ListFooterComponent={<Text style={styles.nota}>* Edad sugerida (no figura en el apunte original).</Text>}
        renderItem={({ item }) => <Tarjeta p={item} onPA={setPa} />}
      />

      <SelectorPA
        visible={selectorPA}
        onClose={() => setSelectorPA(false)}
        onSelect={(v) => {
          setPa(v);
          setSelectorPA(false);
        }}
      />
    </View>
  );
}

function PrincipiosActivos() {
  const [q, setQ] = useState('');
  const nq = norm(q.trim());
  const grupos = GRUPOS_PA.map((g) => ({
    ...g,
    filas: g.filas.filter(
      (f) => !nq || norm([g.grupo, ...f.accion, ...f.nombres].join(' ')).includes(nq),
    ),
  })).filter((g) => g.filas.length > 0);

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.search}
        placeholder="Buscar grupo, acción o nombre…"
        placeholderTextColor={C.muted}
        value={q}
        onChangeText={setQ}
        autoCorrect={false}
      />
      <ScrollView contentContainerStyle={styles.lista} keyboardShouldPersistTaps="handled">
        {grupos.map((g) => (
          <View key={g.grupo} style={styles.card}>
            <Text style={styles.cardTitulo}>{g.grupo}</Text>
            {g.filas.map((f, i) => (
              <View key={i} style={i > 0 && styles.separador}>
                <Text style={styles.label}>Acción</Text>
                {f.accion.map((a) => (
                  <Text key={a} style={styles.cardText}>
                    • {a}
                  </Text>
                ))}
                <Text style={styles.label}>Nombres</Text>
                {f.nombres.map((n) => (
                  <Text key={n} style={styles.cardText}>
                    • {n}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        ))}
        {grupos.length === 0 && <Text style={styles.vacio}>Sin resultados.</Text>}
        <Text style={styles.nota}>ARL = antirradical libre</Text>
      </ScrollView>
    </View>
  );
}

export default function App() {
  const [tab, setTab] = useState<'productos' | 'pa'>('productos');
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
        <StatusBar style="dark" />
        <Text style={styles.titulo}>Cremas</Text>
        <View style={styles.tabs}>
          <Pressable style={[styles.tab, tab === 'productos' && styles.tabActive]} onPress={() => setTab('productos')}>
            <Text style={[styles.tabText, tab === 'productos' && styles.tabTextActive]}>Productos</Text>
          </Pressable>
          <Pressable style={[styles.tab, tab === 'pa' && styles.tabActive]} onPress={() => setTab('pa')}>
            <Text style={[styles.tabText, tab === 'pa' && styles.tabTextActive]}>Principios activos</Text>
          </Pressable>
        </View>
        {tab === 'productos' ? <Productos /> : <PrincipiosActivos />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  titulo: { fontSize: 28, fontWeight: '700', color: C.text, paddingHorizontal: 16, paddingTop: 8 },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: C.chip,
    borderRadius: 10,
    padding: 3,
  },
  tab: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  tabActive: { backgroundColor: C.card },
  tabText: { color: C.muted, fontWeight: '600' },
  tabTextActive: { color: C.accent },
  search: {
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: C.text,
  },
  barra: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 10 },
  link: { color: C.accent, fontWeight: '600' },
  filtro: { marginTop: 8 },
  filtroTitulo: { fontSize: 12, color: C.muted, fontWeight: '600', paddingHorizontal: 16, marginBottom: 4 },
  chipRow: { flexDirection: 'row', gap: 6, paddingHorizontal: 16 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: C.chip },
  chipActive: { backgroundColor: C.accent },
  chipText: { color: C.text, fontSize: 14 },
  chipTextActive: { color: '#fff', fontWeight: '600' },
  lista: { padding: 16, gap: 12, paddingBottom: 48 },
  card: {
    backgroundColor: C.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: C.border,
  },
  cardTitulo: { fontSize: 17, fontWeight: '700', color: C.text },
  cardText: { fontSize: 15, color: C.text, lineHeight: 21 },
  label: { fontSize: 12, color: C.muted, fontWeight: '600', marginTop: 10, marginBottom: 2, textTransform: 'uppercase' },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6 },
  badge: {
    fontSize: 12,
    color: C.accent,
    backgroundColor: C.accentSoft,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    overflow: 'hidden',
  },
  badgeEdad: { color: C.muted, backgroundColor: C.chip },
  paRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6 },
  paChip: { borderWidth: 1, borderColor: C.border, borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2 },
  paChipText: { fontSize: 12, color: C.muted },
  separador: { borderTopWidth: 1, borderTopColor: C.border, marginTop: 12, paddingTop: 2 },
  muted: { color: C.muted },
  vacio: { textAlign: 'center', color: C.muted, marginTop: 32 },
  nota: { fontSize: 12, color: C.muted, marginTop: 8 },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  modalTitulo: { fontSize: 22, fontWeight: '700', color: C.text },
  paItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  paItemText: { fontSize: 16, color: C.text },
});
